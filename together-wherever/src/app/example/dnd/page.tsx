"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";

const initialItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
];

export default function DraggableList() {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  useEffect(() => {
    console.log(items)
  }, [items]); 

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-4 bg-gray-100 rounded-lg"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>                
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 mb-2 bg-white rounded shadow"
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
