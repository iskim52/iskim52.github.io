import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';
import useStore from '../store.tsx';


export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const xEqual = sourceX === targetX;
  const yEqual = sourceY === targetY;

  const {headerTheme} = useStore();

  const [edgePath] = getBezierPath({
    // we need this little hack in order to display the gradient for a straight line
    sourceX: xEqual ? sourceX + 0.0001 : sourceX,
    sourceY: yEqual ? sourceY + 0.0001 : sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className={"react-flow__edge-path-" + headerTheme}
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
}
