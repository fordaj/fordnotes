[Back](index.md)



# What is a task?

- **Task Creation**: `xTaskCreate` in FreeRTOS
- **Task Implementation**: Task function to run on CPU
- Tasks are normally implemented as an infinite loop
```c
for ( ;; )
{
    // Task functionality code goes here
}
```
- If a task breaks out of its loop, the task should be deleted before the function ends:
```c
vTaskDelete(NULL);
```
- (Not sure what happens if it isn't deleted)



# FreeRTOS task creation API

- Documented on [freeRTOS.org](https://www.freertos.org/a00106.html)

- Each task comes with its own stack

- This API creates a new FreeRTOS task using dynamic memory allocation & adds the newly created task (TCB) to the ready queue of the kernel:

```c++
BaseType_t xTaskCreate(
    TaskFunction_t pxTaskCode, // Address of associated task handler (function pointer)
    const char* const pcName, // Descriptive name to identify task
    const configSTACK_DEPTH_TYPE usStackDepth, // Amount of stack memory allocated to task (in words, not bytes)
    void* const pvParameters, // Pointer of data needed to be passed to task handler once it gets scheduled (passed to task handler)
    UBaseType_t uxPriority, // Task priority value
    TaskHandle_* const pxCreatedTask // Used to save the task handle (address of created task)
)
```

- The board's stack width (32-bit, etc.) and the `usStackDepth` parameter are used to determine the task's memory capacity

    - During a `push` operation, 32-bits of memory is added to our STM32 board memory
    
    - During a `pop` operation, 32-bits of memory is retrieved from our STM32 board memory

- In FreeRTOS, the `UBaseType_t` is defined to be 32-bit on 32-bit boards (`uint32_t`), 16-bit on 16-bit boards (`uint16_t`), etc. under the `configSTACK_DEPTH_TYPE` macro
    
    ```c
    #define configSTACK_DEPTH_TYPE uint32_t (FreeRTOS.h)
    ```


# Task Priorities in FreeRTOS

- Task priorities come into play when there are 2 or more tasks in the system

- LOWER PRIORITY VALUE = LOWER URGENCY

- Each task is assigned a priority value from `0` to `configMAX_PRIORITIES - 1` (defined in `FreeRTOSConfig.h`)

- `configMAX_PRIORITIES` is application-specific and does not have a conventional standard... but too many values can lead to RAM overconsumption & system performance hinderance due to context switching



# Exercise 001

1. Clean the project (right-click, clean project)

2. Rename project `001Tasks`

3. Rename the project in File Explorer

4. Refresh the project in the IDE, and click "Delete" when prompted

5. File > Import > General > Existing Projects into Workspace > 001Tasks

6. 001Tasks > Core > Src > main.c

7. Add the following `USER CODE BEGIN Includes`
```c
#include <stdio.h> // For printf
#include "FreeRTOS.h"
#include "task.h"
```

8. Initialize the following in `USER CODE BEGIN 1`
```c
  TaskHandle_t task1_handle;
  TaskHandle_t task2_handle;
  
  BaseType_t status; // Stores success/fail flags from xTaskCreate for configASSERT
```
9. Prototype the following task definitions in `USER CODE BEGIN PFP` (Private Function Prototypes)
```c
static void task1_handler(void* parameters);
static void task2_handler(void* parameters);
```

10. Define & validate the following tasks in `USER CODE BEGIN 2`
```c
  status = xTaskCreate(task1_handler, "Task-1", 200, "Hello world from Task-1", 2, &task1_handle);
  configASSERT(status==pdPASS);
  
  status = xTaskCreate(task2_handler, "Task-2", 200, "Hello world from Task-2", 2, &task2_handle);
  configASSERT(status==pdPASS);
```


11. Define the tasks in `USER CODE BEGIN 4`
```c
static void task1_handler(void* parameters)
{

}
static void task2_handler(void* parameters)
{

}
```

12. Project should build successfully



# Scheduling Policies

1. Start the scheduler in `USER CODE BEGIN 2`

    ```c
    status = xTaskCreate(task1_handler, "Task-1", 200, "Hello world from Task-1", 2, &task1_handle);
    configASSERT(status==pdPASS);

    status = xTaskCreate(task2_handler, "Task-2", 200, "Hello world from Task-2", 2, &task2_handle);
    configASSERT(status==pdPASS);

    vTaskStartScheduler(); // Start the FreeRTOS scheduler

    // If the code reaches this point, there is likely insufficient memory to launch the scheduler.
    ```

2. Add infinite loops to the task handlers in `USER CODE BEGIN 4`

    ```c
    static void task1_handler(void* parameters)
    {
        while(1)
        {
            
        }
    }
    static void task2_handler(void* parameters)
    {
        while(1)
        {
            
        }
    }
    ```

3. Add print statements to while loops:

    ```c
    static void task1_handler(void* parameters)
    {
    while(1)
    {
        printf("%s\n", (char*)parameters);
    }
    }
    static void task2_handler(void* parameters)
    {
    while(1)
    {
        printf("%s\n", (char*)parameters);
    }
    }
    ```

4. Open `syscalls.c` and paste the following code below the final `#include` statement:

```c
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//					Implementation of printf like feature using ARM Cortex M3/M4/ ITM functionality
//					This function will not work for ARM Cortex M0/M0+
//					If you are using Cortex M0, then you can use semihosting feature of openOCD
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//Debug Exception and Monitor Control Register base address
#define DEMCR        			*((volatile uint32_t*) 0xE000EDFCU )

/* ITM register addresses */
#define ITM_STIMULUS_PORT0   	*((volatile uint32_t*) 0xE0000000 )
#define ITM_TRACE_EN          	*((volatile uint32_t*) 0xE0000E00 )

void ITM_SendChar(uint8_t ch)
{

	//Enable TRCENA
	DEMCR |= ( 1 << 24);

	//enable stimulus port 0
	ITM_TRACE_EN |= ( 1 << 0);

	// read FIFO status in bit [0]:
	while(!(ITM_STIMULUS_PORT0 & 1));

	//Write to ITM stimulus port0
	ITM_STIMULUS_PORT0 = ch;
}

```

5. Change the following:
```c
__attribute__((weak)) int _write(int file, char *ptr, int len)
{
	int DataIdx;

	for (DataIdx = 0; DataIdx < len; DataIdx++)
	{
		__io_putchar(*ptr++);
	}
	return len;
}
```
to:
```c
__attribute__((weak)) int _write(int file, char *ptr, int len)
{
	int DataIdx;

	for (DataIdx = 0; DataIdx < len; DataIdx++)
	{
		//__io_putchar(*ptr++);
		ITM_SendChar(*ptr++);
	}
	return len;
}
```


# Exercise 001 testing

1. Note the clock speed from `.ioc` file > Clock Configuration > Cortex System timer (MHz)

2. Debug configurations > STM32 Cortex-M C/C++... > 001Tasks > Debugger > SWV > Enable, and set the clock speed to that recorded from the previous step

3. Debug as > STM32 Cortex-M C/C++...

4. Window > Show View > SWV > SWV ITM Data Console

5. Check the box for port 0

6. Select "Start Trace" in the SWV ITM Data Console

7. Press "Play", and our console should print to the SWV console

- Disabling `configUSE_PREEMPTION` will result in only task 1 executing

- Changing the `USER CODE BEGIN 4` to the following enables cooperative scheduling
```c
static void task1_handler(void* parameters)
{
  while(1)
  {
	  printf("%s\n", (char*)parameters);
	  taskYIELD();
  }
}
static void task2_handler(void* parameters)
{
  while(1)
  {
	  printf("%s\n", (char*)parameters);
	  taskYIELD();
  }
}
```