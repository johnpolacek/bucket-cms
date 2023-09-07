import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface SortableItemProps {
  children: React.ReactElement
  index: number
}

export const SortableItem: React.FC<SortableItemProps> = ({ children, index }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: index.toString() })

  const style = {
    transform: CSS.Transform.toString(transform),
  }

  const dragHandleProps = {
    ...attributes,
    ...listeners,
    isDraggable: true,
  }

  return React.cloneElement(children, {
    dragHandleProps,
    setNodeRef,
    itemProps: { style },
  })
}
