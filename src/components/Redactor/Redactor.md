```jsx
import { Redactor } from '@texttree/notepad-rcl';

<Redactor initId="first_note" />;
```

### **id**

#### If you want to use an Editor twice or more, give each Editor a unique **`id`**

```jsx
import { useState } from 'react';
import { Redactor } from '@texttree/notepad-rcl';
const [currentEditor, setCurrentEditor] = useState(null);
<Redactor
  currentEditor={currentEditor}
  setCurrentEditor={setCurrentEditor}
  // initId="second_note"
  noteDBId={'noteDBId'}
/>;
```

<!--
### **Placeholder**

#### Pass the **`placeholder`** option if you want to set a custom placeholder

```jsx
import React from 'react';
import { Editor } from '@texttree/notepad-rcl';

const changePlaceholder = 'changed default text';

<Editor initId="placeholder_sample" placeholder={changePlaceholder} />;
``` -->

<!-- ### **Save note**

### If you want to use your own method for saving notes, pass it in props

```jsx
import { Editor, useData } from '@texttree/notepad-rcl';

const { saveNote, getNote } = useData();

<Editor initId="saveNote_sample" saveBtn="true" saveNote={saveNote} getNote={getNote} />;
```

### **Rename the database**

### You can also rename the database from "localforage" -->

<!--
```jsx
import { Editor, useData } from '@texttree/notepad-rcl';

const { dBNameRegistration, saveNote, getNote } = useData();

dBNameRegistration('NotepadRCL');

<Editor id="dBNameRegistration_sample" />;
``` -->