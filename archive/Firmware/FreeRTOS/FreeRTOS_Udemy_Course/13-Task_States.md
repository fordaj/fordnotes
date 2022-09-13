
# Task States

- Tasks not running on the CPU are in the `Not running` state

- `Not-running` state contains 3 states: `Suspended`, `Ready`, and `Blocked`

    - `vTaskSuspend()`: Suspends a task. (Transitions a task from the `Ready` or `Running` state to the `Suspended` state)

    - `vTaskResume()`: Resumes a task. (Transitions from the `Suspend` state to the `Ready` state)

    - `TaskAbortDelay()`: Unblocks a task (Transitions from the `Blocked` state to the `Ready` state)

    - The scheduler takes a task from the `Ready` state to the `Running` state

    - Preemption and `taskYIELD()` take a task from the `Running` state to the `Ready` state

- Only one task can be in the `running` state in a CPU core at a time

# Blocked and Suspended State

- 