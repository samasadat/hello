export const createTaskCard = (task) => {
  const task_div = document.createElement("div");
  const cat_div = "";
  const {
    title,
    avatar,
    status,
    priority,
    createdAt,
    name,
    description,
    id,
    dueDate,
  } = task;
  task.category.forEach((cat) => {
    cat_div += `<span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
        ${cat}
      </span>`;
  });

  task_div.innerHTML = `
        <div class="max-w-md rounded-xl overflow-hidden shadow-lg bg-white border-l-4 ${
          status === "Completed"
            ? "border-green-500"
            : status === "In Progress"
            ? "border-orange-500"
            : "border-red-500"
        } hover:shadow-xl transition-shadow duration-300">  
  <div class="flex items-center p-5 border-b border-gray-100">
    <div class="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
      ${avatar}
    </div>
    
    
    <div class="ml-4 flex-1">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
        <span class="px-2 py-1 text-xs rounded-full 
          ${priority === "High" ? "bg-red-100 text-red-800" : ""}
          ${priority === "Medium" ? "bg-yellow-100 text-yellow-800" : ""}
          ${priority === "Low" ? "bg-green-100 text-green-800" : ""}">
          ${priority}
        </span>
      </div>
      <p class="text-sm text-gray-500">${name}</p>
    </div>
  </div>
    
  <div class="p-5">
    <p class="text-gray-700 mb-4">${description}</p>
    
    <div class="mb-4">
      <span class="px-3 py-1 text-sm rounded-full 
        ${
          status === "Completed"
            ? "bg-green-100 text-green-800"
            : status === "In Progress"
            ? "bg-orange-100 text-orange-800"
            : "bg-red-100 text-red-800"
        }">
        ${status}
      </span>
    </div>
    
    <div class="flex justify-between text-sm text-gray-500">
      <div>
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>${new Date(createdAt * 1000).toLocaleDateString()}</span>
      </div>
      <div class="text-right">
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>${new Date(dueDate * 1000).toLocaleDateString()}</span>
      </div>
    </div>
    <div class="px-5 pb-5">
    <div class="flex flex-wrap gap-2">
        ${cat_div}
    </div>
  </div>
  <div class="flex justify-between">
  ${
    status !== "Completed"
      ? `<button 
                            data-id="${id}"
                            data-status="${
                              status === "In Progress"
                                ? "Completed"
                                : "In Progress"
                            }"
                            class="status-btn px-3 py-1 rounded ${
                              status === "In Progress"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                            } transition-colors"
                        >
                            ${
                              status === "In Progress"
                                ? "Mark as Complete"
                                : "Mark as In Progress"
                            }
                        </button>`
      : ""
  }  
  <div class="flex-grow"></div>
  <button 
                            data-id="${id}" 
                            class="delete-btn text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        </div>
  </div>
</div>`;
  return task_div;
};
