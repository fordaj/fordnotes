[Back](index.md)

# Trace tool download

- [SEGGER SystemView Software v3.20](https://www.segger.com/downloads/systemview/) (host)

    - Software toolkit to analyze embedded software running on the target device (RTOS/GPOS/Other/etc.)

    - Available for big 3 OSes

    - In FreeRTOS application:
    
        - Analyze how many tasks are running, their duration on CPU

        - ISR entry and exit timings and duration of CPU runtime

        - Analyzes other task behavior (blocking, unblocking, notifying, yielding, etc.)

        - Analyzes CPU idle time

        - Total runtime behavior of application

    - Offers insight to event occurrence and order, which interrupt triggered which task switch, which interrupt and task cas called which API function of the underlying RTOS

    - Should be used to verify that the embedded system behaves as expected

    - Can be used to find problems and inefficiencies (such as superfluous and spurious interrupts, and unexpected task changes)

- [SEGGER SystemView Target Source v3.20](https://www.segger.com/downloads/systemview/) Files (target)

    - Collects event information and sends back to PC for visualization

- SEGGER ST_Link Reflash Utility (Not Used)

- SEGGER J-Link Software Package V5.12b or later (Not Used)

- [SEGGER SystemView User Manual](https://www.segger.com/downloads/systemview/)



# Segger SystemView Recording Modes

- Real time recording

    - Need a J-Link debugger

    - Uses Real Time Transfer (RTT) technology

    - Continuously records data for real-time visualization and analysis

    - Can be achieved via ST-link instead of J-Link

        - J-Link FW must be flashed onto ST_Link circuitry of STM32 boards

- Single Shot Recording

    - No need for JLINK or STLINK debugger

    - Recording is started manually in the application

    - Allows for recording of specific parts of interest

# SEGGER SystemView Overview

- Install from their website using a `.deb`, `.exe`, or `.dmg` file

- Run the software, and then `File > New` should link to example data

# SEGGER SystemView Target Integration

1. Add a folder called `SEGGER` under `ThirdParty`

2. Add the following folders under `SEGGER`

    - Config

        - Paste "SystemView_Src_V320 > Config" contents here

        - Paste "SystemView_Src_V320 > Sample > FreeRTOSV10 > Config > Cortex-M" contents here


    - OS

        - Paste `.c` and `.h` file from "SystemView_Src_V320" > Sample > FreeRTOSV10" here

    - Patch

        - Paste downloaded file from lecture here

    - SEGGER

        - Paste "SystemView_Src_V320" > SEGGER" contents here

        - Inside folder `Syscalls`, delete all non-GCC compiler files

3. In IDE, refresh project

4. Right-click `ThirdParty` in the project pane > Team > Apply Patch...

5. Click through the prompts, ensuring that the patch is applied to `ThirdParty`

6. `SEGGER_SYSVIEW_FreeRTOS.h` must be included EITHER at the end of `FreeRTOSConfig.h` OR above each include of `FreeRTOS.h`. It defines trace macros to create SYSTEMVIEW events

7. Include the following macros in `FreeRTOSConfig.h`:

    ```c
    #define INCLUDE_xTaskGetIdleTaskHandle 1
    #define INCLUDE_pxTaskGetStackStart 1
    ```

8. Add processor core used by MCU in `SEGGER_SYSVIEW_ConfDefaults.h`

    ```c
      #ifndef   SEGGER_SYSVIEW_CORE
        #define SEGGER_SYSVIEW_CORE SEGGER_SYSVIEW_CORE_OTHER
      #endif
    ```
    to
    ```c
      #ifndef   SEGGER_SYSVIEW_CORE
        #define SEGGER_SYSVIEW_CORE SEGGER_SYSVIEW_CORE_CM3
      #endif
    ```

9. Configure SystemView buffer size configuration in `SEGGER_SYSVIEW_ConfDefaults.h` (`SEGGER_SYSVIEW_RTT_BUFFER_SIZE`)

    - Increase/decrease this value as needed

    - Default is 1Kb (1024 bytes)

    ```c
      #define SEGGER_SYSVIEW_RTT_BUFFER_SIZE          1024
    ```

    to

    ```c
      #define SEGGER_SYSVIEW_RTT_BUFFER_SIZE          (4 * 1024)
    ```

10. Configure application specific info in `SEGGER_SYSVIEW_Config_FreeRTOS.c`

    ```c
    // The application name to be displayed in SystemViewer
    #define SYSVIEW_APP_NAME        "FreeRTOS Demo Application"

    // The target device name
    #define SYSVIEW_DEVICE_NAME     "Cortex-M4"
    ```

    to 

    ```c
    // The application name to be displayed in SystemViewer
    #define SYSVIEW_APP_NAME        "FreeRTOS Hello World Application"

    // The target device name
    #define SYSVIEW_DEVICE_NAME     "STM32F446-Nucleo"
    ```

11. Enable the "cycle count since last reset" register by adding the following to `main.c` `USER CODE BEGIN PV` and modifying `USER CODE BEGIN 2 according to the info in the Cortex M4 user manual:

```c
//Enable the CYCCNT counter
#define DWT_CTRL (*(volatile uint32_t*)0xE0001000) 
```
```c
//Enable the CYCCNT counter
DWT_CTRL |= (1 << 0);

status = xTaskCreate(task1_handler, "Task-1", 200, "Hello world from Task-1", 2, &task1_handle);
configASSERT(status==pdPASS);

status = xTaskCreate(task2_handler, "Task-2", 200, "Hello world from Task-2", 2, &task2_handle);
configASSERT(status==pdPASS);

vTaskStartScheduler(); // Start the FreeRTOS scheduler

// If the code reaches this point, there is likely insufficient memory to launch the scheduler.
```

12. Call the two SEGGER APIs related to SysView in `main.c` `USER CODE BEGIN 2`:

```c
  /* USER CODE BEGIN 2 */
  
  DWT_CTRL |= (1 << 0);
  
  SEGGER_SYSVIEW_Conf();
  SEGGER_SYSVIEW_Start();
  
  status = xTaskCreate(task1_handler, "Task-1", 200, "Hello world from Task-1", 2, &task1_handle);
  configASSERT(status==pdPASS);

  status = xTaskCreate(task2_handler, "Task-2", 200, "Hello world from Task-2", 2, &task2_handle);
  configASSERT(status==pdPASS);

  vTaskStartScheduler(); // Start the FreeRTOS scheduler

  // If the code reaches this point, there is likely insufficient memory to launch the scheduler.

  /* USER CODE END 2 */
```

13. Add the include paths to the project compiler settings:

```
ThirdParty/SEGGER/Config
ThirdParty/SEGGER/OS
ThirdParty/SEGGER/SEGGER
```

14. Add the include paths to the project assembly settings:
```
ThirdParty/SEGGER/Config
```

15. Resolve the priority grouping error by adding the following to `stm32f4xx_hal_msp.c`:
```c
/* USER CODE BEGIN Includes */
#include "FreeRTOS.h"
/* USER CODE END Includes */
```

```c
  /* USER CODE BEGIN MspInit 1 */
  vInitPrioGroupValue(); // Resolves priority grouping error
  /* USER CODE END MspInit 1 */
```

15. Ensure that `FreeRTOSConfig.h` > `configUSEPREEMPTION` is set to 1 and the `main.c` > `taskYIELD()` functions are commented out

16. Collect the recorded data (RTT buffer)

    - Single-shot recording:
    
        - Get the SystemView RTT buffer address and the number of bytes used
            
            - Normally `_SEGGER_RTT.aUp[1].pBuffer` and `_SEGGER_RTT.aUp[1].WrOff`)

        - Take the memory dump to a file

        - Save the file with a `.SVDat` extension

        - Use that file to load into SystemView HOST software to analyze the events

    1.  Expressions > _SEGGER_RTT > aUP > aUp[1] > pBuffer
        ```c
        0x200132b0
        ```

        ```c
        4095
        ```

    2. Window > Show View > Memory Browser

    3. Paste the address

    4. Click "Go"

    5. Export 4095 bytes from this address onwards as "Raw Binary" titled "001.SVdat"

    6. Data can now be imported to SEGGER SystemView


# Analyzing exercise 001 using SEGGER trace

1. Hide all windows that are not the event list

2. The remaining window is the event list

3. Open the timeline window - it shows task behavior. Notice the `SysTick` and the `Scheduler` that run prior to each task switch

4. Open the CPU Load window - it shows that the CPU is under full load when tasks are running

    - Because they are equal priority, the load distribution is almost identical

5. Open the "Contexts" window

    - Note the Priority level under "Type" column

    - Note the stack size and starting addresses

# Analyzing cooperative scheduling trace

1. Enable **Cooperative Scheduling**

    - `FreeRTOSConfig.h` > `configUSE_PREEMPTION` --> 0

    - `main.c` > `USER CODE BEGIN 4` > Uncomment `taskYIELD();`

2. Build, download to target, run for a few seconds, export memory file, open in SystemView

3. Notice that SysTick still happens every 1ms, but does not trigger the scheduler, which only runs once at the beginning

# Passing `printf()` Statements to SEGGER SystemView

- Following the *Segger SystemView User Guide*, there is a function called `SEGGER_SYSVIEW_PrintfTarget()`

1. Replace the `printf()` function in our task handlers with `SEGGER_SYSVIEW_PrintfTarget()` functions

    - Format the string as follows:

        ```c
        static void task1_handler(void* parameters)
        {

        char msg[100];

        while(1)
        {
            snprintf(msg, 100, "%s\n", (char*)parameters);
            SEGGER_SYSVIEW_PrintfTarget(msg); // Print to SEGGER SystemView
            taskYIELD();
        }
        }
        ```