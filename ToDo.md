# To Do


1.   [X] Install WSL
2.   [X] Install React
3.   [X] Run through react tutorial
4.   [X] Install ReactFlow
5.   [X] Run through ReactFlow Tutorial
6.   [X] Run ReactFlow Drag and Drop
7.   [X] Export ReactFlow Graph to JSON
8.   [X] Create Editable Nodes
9.   [X] Fixed Dropnode functionality to handle for drop location.
10.  [X] Delete node function
11.  [X] Add right click function
12.  [X] Delete on keypress
13.  [X] Add top menu
14.  [X] Drag and drop from node edge
15.  [X] Create Transition to workflow view and display JSON there
16.  [X] Create Parser for Graph into structure that can be utilized by workflow View
17.  [X] Create Workflow View to take new structure and display
18.  [X] Add edit node box
      - [ ] Style edit node box
19.  [ ] Convert textarea for nodes into editable div
      - [ ] Update node store to include HTML label and regular label
20.  [ ] Add edit node features
      - [ ] Font Style
      - [ ] Font Size
      - [ ] Bold
      - [ ] Italic
      - [ ] Underline
      - [ ] Text Color
      - [ ] Insert Image
      - [ ] Hyperlink
      - [ ] Background Color
21.  [ ] Add Image support
22.  [ ] Add workflow view niceties
      - [ ] Reset
      - [ ] Back
23.  [X] Refactor so that all global states are run from top level and pushed down
      - [X] Implement Zustand 
24.  [ ] Add tutorial
25.  [ ] Add Contact me
26.  [ ] Send to chrome extension

Bugs:
- [X] When going to graph view from workflow view nodes reset. Why? 
  - When swapping back to graph view it uses a set of initial nodes that is redeclared when swapping back. Need to figure out how to save state going back and forth
- [X] None of the file options work from workflow view
  - Need to pull out header menu from flow and refactor to pass graph state from top level
- [ ] Fix context add node to drop on cursor position


- Prettify
  - Add theming
- Drag and Drop aesthetic functions
  - bold
  - italtics
  - links
  - color
  - Size
  - Font
- Workflow View
  - Reset
  - Back
