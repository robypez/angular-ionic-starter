class DBconfig extends Constant
  constructor: ->
    return {
      name: 'nautica',
      tables: [
        {
          name: 'Questions',
          columns: [
            {name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'},
            {name: 'text', type: 'TEXT'},
            {name: 'exam_type', type: 'TEXT'},
            {name: 'section_id', type: 'REFERENCES Sections(id)'},
            {name: 'errors_count', type: 'INTEGER'},
            {name: 'done_count', type: 'INTEGER'},
            {name: 'image', type: 'TEXT'}
          ]
        },
        {
          name: 'Answers',
          columns: [
            {name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'},
            {name: 'text', type: 'TEXT'},
            {name: 'correct', type: 'INTEGER'},
            {name: 'question_id', type: 'REFERENCES Questions(id)'}  
          ]
        },
        {
          name: 'Sections',
          columns: [
            {name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'},
            {name: 'label', type: 'TEXT'},
            {name: 'image', type: 'TEXT'},

          ]
        } 
      ]
    }
