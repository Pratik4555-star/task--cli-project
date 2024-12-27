# Task Tracker CLI

A simple CLI application to track your tasks.

## Commands

- `add <task_description>`: Adds a new task.
- `update <task_id> <new_description>`: Updates an existing task.
- `delete <task_id>`: Deletes a task.
- `mark-in-progress <task_id>`: Marks a task as "in-progress".
- `mark-done <task_id>`: Marks a task as "done".
- `list`: Lists all tasks.
- `list done`: Lists all tasks with status "done".
- `list todo`: Lists all tasks with status "todo".
- `list in-progress`: Lists all tasks with status "in-progress".

## Usage

# Add a task
node index.js add "Buy groceries"

# List all tasks
node index.js list

# List tasks by status (done, todo, in-progress)
node index.js list done
node index.js list todo
node index.js list in-progress

# Update a task
node index.js update 1 "Buy groceries and cook dinner"

# Delete a task
node index.js delete 1

# Mark a task as in-progress or done
node index.js mark-in-progress 1
node index.js mark-done 1

https://roadmap.sh/projects/task-tracker
