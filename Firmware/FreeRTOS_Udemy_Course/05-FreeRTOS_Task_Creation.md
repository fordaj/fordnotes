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

