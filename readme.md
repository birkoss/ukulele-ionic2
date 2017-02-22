Chord in DataProvider
=====================

* Add the family in the favorites (also saved)

* Generate muted strings

* Add all chords/notes from V1

* Show a message when no favorites are present
* Hide the text on the small Chord Position (more preview)
* Remove the method in the Component and generate variable (to optimise)
* Fix the note-name when they are in English, to remove the space "A m" to "Am"

* See if String is an existing ionic/angular classes (and rename it if it is)

* Instead of having multiple array in Position, should be String based
    * Position:
        * strings:Array<String>
            * name:string
                * G, C, E, A
            * fret:number
                * 0 = Open
                * X = Fret at that position
                * -1 = Muted
            * finger:number
                * 1, 2, 3, 4
