## Boundary Testing

### Test Case 1: Should not allow login with invalid credentials
1. Navigate to the Home Assistant login page
2. Enter invalid username and password
3. Click on the login button
4. Assert that the error message "Invalid username or password" is displayed

### Test Case 2: Should not allow turning on more than the maximum number of lights
1. Log in to the Home Assistant dashboard
2. Get the maximum number of lights supported by the Home Assistant instance
3. Turn on the maximum number of lights
4. Try to turn on one more light
5. Assert that an error message is displayed indicating that the maximum number of lights has been reached

### Test Case 3: Should not allow setting the temperature outside the valid range
1. Log in to the Home Assistant dashboard
2. Get the valid temperature range for the Home Assistant instance
3. Set the temperature outside the valid range
4. Assert that an error message is displayed indicating that the temperature is outside the valid range

## Performance Testing

### Test Case 4: Should handle large number of lights without performance degradation
1. Log in to the Home Assistant dashboard
2. Get the maximum number of lights supported by the Home Assistant instance
3. Create the maximum number of lights and turn them on
4. Measure the time taken to create and turn on all the lights
5. Assert that the time taken is within an acceptable range

### Test Case 5: Should handle multiple simultaneous user connections without performance degradation
1. Log in to the Home Assistant dashboard with multiple user accounts
2. Have each user perform a series of actions simultaneously
3. Measure the time taken for all users to complete their actions
4. Assert that the time taken is within an acceptable range

Note that the specific implementation of these tests may vary depending on the Home Assistant instance being tested and the specific performance metrics being measured.