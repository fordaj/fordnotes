- `configASSERT()` (*function*): Triggers an infinite loop if the handler is not provided properly.
    - Example: If `status` does not return a success flag (`pdPASS`), `configASSERT` will loop.
    ```c
      status = xTaskCreate(task1_handler, "Task-1", 200, "Hello world from Task-1", 2, &task1_handle);
      configASSERT(status==pdPASS);
    ```

- **TCB**: Task control block

- **Preemption**: Replacing a running task with another task, forcing it back to a "ready" state.

- **Round-robin (cyclic) pre-emptive scheduling**: Tasks in the "ready list" run for a fixed time duration (time quanta), at which point a context switch occurs.

- **RTOS tick**: Simply a timer interrupt occurring on a periodically occurring fixed time frame.

- **Priority-based pre-emptive scheduling**: A scheduling policy where tasks of the highest priority run until they enter a blocking state.

- **Cooperative Scheduling**: A scheduling policy where tasks practice task yielding.

- **Context-switch**: save of the execution context of the current task, and retrieval of the execution context of the next task.

- **Blocking state**: Waiting state off-CPU until a certain event occurs.

- **Task Yielding**: Voluntary departure of CPU core so other tasks can run.

- `vTaskStartScheduler();` (*function*): Starts the scheduler.

  - Does not return
  
    - Exception: Insufficient memory