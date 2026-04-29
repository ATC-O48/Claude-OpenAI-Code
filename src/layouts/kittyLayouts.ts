import type { Pane, PaneSplit, KittyLayoutConfig } from '../types/workspace';

type LayoutNode = Pane | PaneSplit;

let splitCounter = 1000;
const genSplitId = () => `ksplit-${++splitCounter}`;

function isPaneSplit(node: LayoutNode): node is PaneSplit {
  return 'direction' in node && 'children' in node;
}

export function collectPanes(layout: LayoutNode): Pane[] {
  if (!isPaneSplit(layout)) return [layout];
  const panes: Pane[] = [];
  for (const child of layout.children) {
    panes.push(...collectPanes(child));
  }
  return panes;
}

function makeSplit(
  direction: 'horizontal' | 'vertical',
  children: LayoutNode[],
  sizes: number[],
): PaneSplit {
  return {
    id: genSplitId(),
    direction,
    children,
    sizes,
  };
}

function equalSizes(count: number): number[] {
  const size = Math.round(100 / count);
  return Array.from({ length: count }, (_, i) =>
    i === count - 1 ? 100 - size * (count - 1) : size,
  );
}

function buildStack(panes: Pane[]): LayoutNode {
  if (panes.length === 0) return panes[0];
  return makeSplit('horizontal', panes, equalSizes(panes.length));
}

function buildTall(panes: Pane[], config: KittyLayoutConfig): LayoutNode {
  if (panes.length <= 1) return panes[0];

  const fullSize = Math.min(config.fullSize, panes.length);
  const mainPanes = panes.slice(0, fullSize);
  const sidePanes = panes.slice(fullSize);

  if (sidePanes.length === 0) {
    if (mainPanes.length === 1) return mainPanes[0];
    return makeSplit('horizontal', mainPanes, equalSizes(mainPanes.length));
  }

  const mainSection: LayoutNode =
    mainPanes.length === 1
      ? mainPanes[0]
      : makeSplit('horizontal', mainPanes, equalSizes(mainPanes.length));

  const sideSection: LayoutNode =
    sidePanes.length === 1
      ? sidePanes[0]
      : makeSplit('vertical', sidePanes, equalSizes(sidePanes.length));

  const children: LayoutNode[] = config.mirrored
    ? [sideSection, mainSection]
    : [mainSection, sideSection];

  const sizes = config.mirrored
    ? [100 - config.bias, config.bias]
    : [config.bias, 100 - config.bias];

  return makeSplit('horizontal', children, sizes);
}

function buildFat(panes: Pane[], config: KittyLayoutConfig): LayoutNode {
  if (panes.length <= 1) return panes[0];

  const fullSize = Math.min(config.fullSize, panes.length);
  const mainPanes = panes.slice(0, fullSize);
  const sidePanes = panes.slice(fullSize);

  if (sidePanes.length === 0) {
    if (mainPanes.length === 1) return mainPanes[0];
    return makeSplit('vertical', mainPanes, equalSizes(mainPanes.length));
  }

  const mainSection: LayoutNode =
    mainPanes.length === 1
      ? mainPanes[0]
      : makeSplit('vertical', mainPanes, equalSizes(mainPanes.length));

  const sideSection: LayoutNode =
    sidePanes.length === 1
      ? sidePanes[0]
      : makeSplit('horizontal', sidePanes, equalSizes(sidePanes.length));

  const children: LayoutNode[] = config.mirrored
    ? [sideSection, mainSection]
    : [mainSection, sideSection];

  const sizes = config.mirrored
    ? [100 - config.bias, config.bias]
    : [config.bias, 100 - config.bias];

  return makeSplit('vertical', children, sizes);
}

function buildGrid(panes: Pane[]): LayoutNode {
  if (panes.length <= 1) return panes[0];
  if (panes.length === 2) {
    return makeSplit('horizontal', panes, [50, 50]);
  }

  const cols = Math.ceil(Math.sqrt(panes.length));
  const rows = Math.ceil(panes.length / cols);

  const rowNodes: LayoutNode[] = [];
  for (let r = 0; r < rows; r++) {
    const rowPanes = panes.slice(r * cols, (r + 1) * cols);
    if (rowPanes.length === 1) {
      rowNodes.push(rowPanes[0]);
    } else {
      rowNodes.push(makeSplit('horizontal', rowPanes, equalSizes(rowPanes.length)));
    }
  }

  if (rowNodes.length === 1) return rowNodes[0];
  return makeSplit('vertical', rowNodes, equalSizes(rowNodes.length));
}

function buildHorizontal(panes: Pane[]): LayoutNode {
  if (panes.length <= 1) return panes[0];
  return makeSplit('horizontal', panes, equalSizes(panes.length));
}

function buildVertical(panes: Pane[]): LayoutNode {
  if (panes.length <= 1) return panes[0];
  return makeSplit('vertical', panes, equalSizes(panes.length));
}

function buildSplits(panes: Pane[], config: KittyLayoutConfig): LayoutNode {
  if (panes.length <= 1) return panes[0];

  const direction =
    config.splitAxis === 'auto'
      ? 'horizontal'
      : config.splitAxis === 'horizontal'
        ? 'horizontal'
        : 'vertical';

  if (panes.length === 2) {
    return makeSplit(direction, panes, [50, 50]);
  }

  const first = panes[0];
  const rest = panes.slice(1);
  const altDirection = direction === 'horizontal' ? 'vertical' : 'horizontal';
  const restNode: LayoutNode =
    rest.length === 1
      ? rest[0]
      : makeSplit(altDirection, rest, equalSizes(rest.length));

  return makeSplit(direction, [first, restNode], [50, 50]);
}

export function applyKittyLayout(
  currentLayout: LayoutNode,
  config: KittyLayoutConfig,
): LayoutNode {
  const panes = collectPanes(currentLayout);
  if (panes.length === 0) return currentLayout;
  if (panes.length === 1) return panes[0];

  switch (config.type) {
    case 'stack':
      return buildStack(panes);
    case 'tall':
      return buildTall(panes, config);
    case 'fat':
      return buildFat(panes, config);
    case 'grid':
      return buildGrid(panes);
    case 'horizontal':
      return buildHorizontal(panes);
    case 'vertical':
      return buildVertical(panes);
    case 'splits':
      return buildSplits(panes, config);
    default:
      return currentLayout;
  }
}

export function getDefaultLayoutConfig(): KittyLayoutConfig {
  return {
    type: 'splits',
    bias: 50,
    fullSize: 1,
    mirrored: false,
    splitAxis: 'horizontal',
  };
}
