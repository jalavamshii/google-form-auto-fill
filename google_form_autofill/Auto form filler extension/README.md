A chrome extension to automatically fill google forms. Users can add the field and value to be filled as needed, added fields can also be deleted. Users can also view the page's base HTML.

Steps to setup:
1. Clone the repository to desired folder.
2. Go to the chrome browser and to extension settings. Enable developer mode.
3. Select "Load unpacked" option and select the folder with the cloned repo.
4. Pin the extension and use.

Usage:
1. Add the Key (The field to search for in the form) and value (the input to add to that field) and select Add. Note that the key field must be in all caps even if the form does not follow that syntax. Repeat this process for all required keys-value pairs
2. When a new form is opened, select update fields and the extension will automatically fill the fields based on the previously filled key-value pairs
3. If a pair needs to be deleted, just enter the Key used in the pair and press delete.
4. The extract html feature can be used to view the base page within the chrome extension.
