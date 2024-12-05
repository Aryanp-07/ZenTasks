# ZenTasks

ZenTasks is a modern, AI-powered task management application built with React Native and Expo. It offers a minimalist yet powerful interface for managing your daily tasks with features like AI-generated subtasks, tag-based organization, and intuitive task filtering.

## Features

- 🎯 **Intuitive Task Management**: Create, edit, and delete tasks with ease
- 🤖 **AI-Powered Subtasks**: Automatically generate subtasks using Google's Generative AI
- 🏷️ **Tag-Based Organization**: Organize tasks with customizable tags
- 🔍 **Smart Filtering**: Filter tasks based on tags for better organization
- 📅 **Due Date Management**: Set and track due dates for tasks
- 🌓 **Dark Mode**: Sleek dark theme for comfortable viewing
- 💾 **Persistent Storage**: Tasks are automatically saved to device storage
- ✅ **Subtask Management**: Create and manage subtasks within main tasks

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aryanp-07/ZenTasks.git
   ```

2. Navigate to the project directory:

    ```shellscript
    cd ZenTasks
    ```


3. Install dependencies:

    ```shellscript
    npm install
    ```


4. Set up environment variables:

   - Create a `.env` file in the root directory
   - Add your Google AI API key:

        ```plaintext
        GOOGLE_AI_API_KEY=your_api_key_here
        ```


5. Start the development server:

    ```shellscript
    npx expo start
    ```




## Technologies Used

- React Native
- Expo
- Google Generative AI
- AsyncStorage for local data persistence
- React Native Calendar
- Expo Google Fonts (Space Grotesk)


## Project Structure

```plaintext
ZenTasks/
├── assets/              # Images and static assets
├── components/          # React Native components
│   ├── AddTaskScreen.js
│   ├── CustomDatePicker.js
│   ├── FilterScreen.js
│   ├── TaskInput.js
│   ├── TaskItem.js
│   └── TaskList.js
├── App.js              # Main application file
└── package.json        # Project dependencies
```

## Usage

1. **Adding a Task**:

    - Tap the + button to create a new task
    - Enter task title, tags (comma-separated), and optional due date
    - Toggle AI switch to automatically generate subtasks
    - Tap "Add Task" to save



2. **Managing Tasks**:

    - Tap the checkbox to mark tasks as complete
    - Use edit icon to modify task details
    - Swipe or tap delete icon to remove tasks



3. **Filtering Tasks**:

    - Tap the filter icon in the header
    - Select tags to filter tasks
    - Tap "Apply" to update the view



4. **Managing Subtasks**:

    - View subtasks under main tasks
    - Mark subtasks as complete independently
    - Edit or delete subtasks as needed


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Contact

For any queries or suggestions, please open an issue in the repository.