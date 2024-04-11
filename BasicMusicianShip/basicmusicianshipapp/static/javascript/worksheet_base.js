
//creates a measure div

//parent is the parent element the measure will be appended to
//min pitch is the lowest pitch allowed in the measure
//max pitch is the highest pitch allowed in the measure

//clef is what clef is used in the measure. Options are treble, tenor, alto, and bass
//show clef is whether or not the clef should be displayed
function createMeasure(measureId = 'measure', minPitch = 'E3', maxPitch = 'F6', clef='treble', showClef=true)
{
    // sets width of the staff in vw (viewport width)
    const staffWidth = 17;

    // sets height of the staff in vw (viewport width)
    const staffHeight = 3;

    var currentMeasure = document.createElement('div');
    currentMeasure.style.width = '17vw';

    currentMeasure.dataset.clef = clef;
    currentMeasure.id = measureId;
    currentMeasure.style.position = 'relative';
    currentMeasure.style.overflow = 'visible';

    currentMeasure.className = 'measureClass';

    var topDistance =  distanceFromStaff(maxPitch, clef, true);
    var bottomDistance =  distanceFromStaff(minPitch, clef, false);

    var nextNote = maxPitch;

    //for notes whose lines and spaces are above the staff
    for(let i = 0; i < topDistance; i++)
    {
        //creates black lines of bar staff
        var square = document.createElement('div');

        square.id = nextNote;
        square.style.backgroundColor = 'white';
        square.style.width = `${staffWidth}vw`;
        nextNote = getNextNote(nextNote);
        square.style.display = 'flex';
        square.style.alignItems = "center";
        square.style.zIndex = "0";
        square.style.position = 'relative';
        square.style.overflow = 'visible';

        //height of black bars of staff
        var lineHeight = '0.37vw';

        //height of spaces in staff
        var spaceHeight = '1.54vw';

        //for line
        if(i % 2 == 1)
        {
            square.className = 'line';
            square.style.height = lineHeight;
        }
        //for space
        else if(i % 2 == 0)
        {
            square.className = 'space';
            square.style.height = spaceHeight;
        }

        currentMeasure.appendChild(square);
    }

    //for the lines and spaces in the staff
    for(let i = 0; i < 9; i++)
    {

        //creates black lines of bar staff
        var square = document.createElement('div');
        square.id = nextNote;
        nextNote = getNextNote(nextNote);
        square.style.backgroundColor = 'white';
        square.style.width = `${staffWidth}vw`;
        square.style.display = 'flex';
        square.style.alignItems = "center";
        square.style.zIndex = "0";
        square.style.position = 'relative';
        square.style.overflow = 'visible';

        //for line
        if(i % 2 == 0)
        {
            square.style.height = lineHeight;
            square.style.backgroundColor = 'black';
            square.className = 'line';
            square.dataset.onStaff = 'onStaff';
        }
        //for space
        else if(i % 2 == 1)
        {
            square.style.height = spaceHeight;
            square.className = 'space';
        }
        currentMeasure.appendChild(square);

        if(i == 0 && showClef)
        {
            var clefImg = new Image();
            clefImg.className = 'clefImage ' + clef;
            clefImg.style.position = 'relative';
            clefImg.style.zIndex = "1";
            square.style.zIndex = "3";

            if(clef == 'bass')
            {

                clefImg.src = fClefUrl;
                clefImg.style.height = '6.5vw'
                clefImg.style.marginTop = '6.5vw';
            }
            else if(clef == 'treble')
            {
                clefImg.src = gClefUrl;
                clefImg.style.width = '4.5vw';
                clefImg.style.marginTop = '9vw';
            }
            else if(clef == 'alto')
            {
                clefImg.src = cClefUrl;
                clefImg.style.height = '7.5vw';
                clefImg.style.marginTop = '7.5vw';
            }
            else if(clef == 'tenor')
            {
                clefImg.src = cClefUrl;
                clefImg.style.height = '7.5vw';
                clefImg.style.marginTop = '3.8vw';
            }

            square.appendChild(clefImg);

        }
    }

     //for notes whose lines and spaces that are below the staff
    for(let i = 0; i < bottomDistance; i++)
    {

        //creates black lines of bar staff
        var square = document.createElement('div');
        square.className = 'square';
        square.style.backgroundColor = 'white';
        square.id = nextNote;
        square.style.width = `${staffWidth}vw`;
        square.style.display = 'flex';
        square.style.alignItems = "center";
        square.style.zIndex = "0";
        square.style.position = 'relative';
        square.style.overflow = 'visible';

        nextNote = getNextNote(nextNote);

        //for line
        if(i % 2 == 1)
        {
            square.style.height = lineHeight;
            square.className = 'line';
        }
        //for space
        else if(i % 2 == 0)
        {
            square.style.height = spaceHeight;
            square.className = 'space';
        }

        currentMeasure.appendChild(square);
    }

    return currentMeasure;
}

//gets how far a note is from the staff, above or below
function distanceFromStaff(note = 'E4', clef = 'treble', above = true)
{

    if(clef == 'treble')
    {
        if(above)
        {
            //for treble clef F5 is note on top of staff
            return(distanceBetweenNotes(note, 'F5'));
        }
        else
        {
            //for treble clef E4 is note on bottom of staff
            return(distanceBetweenNotes(note, 'E4'));
        }
    }
    if(clef == 'bass')
    {
        if(above)
        {
            //for bass clef A3 is note on top of staff
            return(distanceBetweenNotes(note, 'A3'));
        }
        else
        {
            //for bass clef G2 is note on bottom of staff
            return(distanceBetweenNotes(note, 'G2'));
        }
    }
    if(clef == 'alto')
    {
        if(above)
        {
            //for alto clef G4 is note on top of staff
            return(distanceBetweenNotes(note, 'G4'));
        }
        else
        {
            //for alto clef F3 is note on bottom of staff
            return(distanceBetweenNotes(note, 'F3'));
        }
    }
    if(clef == 'tenor')
    {
        if(above)
        {
            //for tenor clef E4 is note on top of staff
            return(distanceBetweenNotes(note, 'E4'));
        }
        else
        {
            //for tenor clef D3 is note on bottom of staff
            return(distanceBetweenNotes(note, 'D3'));
        }
    }

    return -1;
}


function distanceBetweenNotes(noteOne = 'E4', noteTwo = 'E5')
{

   var staffPositionOne = getPositionFromNote(noteOne);
   var staffPositionTwo = getPositionFromNote(noteTwo);

   var distance = staffPositionOne - staffPositionTwo;

   if(distance < 0) return (staffPositionTwo - staffPositionOne)
   return distance;

}

//gets note absolute position given its pitch and octave
function getPositionFromNote(note)
{
   const [pitch, octave] = note.split("");
   const notePositions = {"C":0, "D":1, "E":2, "F":3, "G":4, "A":5, "B":6};
   //Letter Position is the position of the note letter in the alphabet, where A=1, B=2, C=3, D=4, E=5, F=6, G=7.

   // Calculate notes below the staff
   var position = parseInt(octave, 10) * 7 + notePositions[pitch];

   return position;
}

//gets next note from given note a diatonic step below the given notes
function getNextNote(note)
{
    const [pitch, octave] = note.split("");

    var nextPitch = '';
    var nextOctave = octave;

    if(pitch == 'A') nextPitch = 'G';
    if(pitch == 'G') nextPitch = 'F';
    if(pitch == 'F') nextPitch = 'E';
    if(pitch == 'E') nextPitch = 'D';
    if(pitch == 'D') nextPitch = 'C';
    if(pitch == 'C') nextPitch = 'B';
    if(pitch == 'B') nextPitch = 'A';

    if(pitch == 'C') nextOctave = parseInt(octave, 10) - 1;

    return (nextPitch + nextOctave);
}

//adds a note to a measure
//measure - the measure to add the note to
//note type - whole, half, quarter, eight, etc...
//note - note and octave it is in - E5, C4, B2, for example
//noteLeftMargin, how far in vw from the left the note is
function addNote(measure, noteType = 'whole', note = 'C2', accidental = 'natural', noteLeftMargin = 0)
{
    var noteImg = new Image();
    noteImg.style.width = '4.2vw';
    noteImg.src = wholeNoteUrl;
    noteImg.className = 'note';
    noteImg.style.position = 'absolute';
    noteImg.style.overflow = 'visible';
    noteImg.style.zIndex = '0';

    var measureChildElements = measure.childNodes;

    var noteElementIndex = -1;
    var bottomBarLineIndex = -1;

    //accidental image
    let accidentalImg = new Image();
    accidentalImg.style.position = "absolute";

    accidentalImg.className = "accidental";
    accidentalImg.style.height = "3.25vw";

    if(accidental == 'flat')
    {
        accidentalImg.id = 'b';
        accidentalImg.style.marginTop = '-1.35vw';
        accidentalImg.src = flatAccidentalUrl;
    }
    else if(accidental == 'sharp')
    {
        accidentalImg.id = '#';
        accidentalImg.style.marginTop = '0vw';
        accidentalImg.src = sharpAccidentalUrl;
    }
    else
    {
        accidentalImg.id = '';
        accidentalImg.src = naturalAccidentalUrl;
    }

    for(let i = 0; i < measureChildElements.length; i++)
    {
        var currentMeasureChildElement = measureChildElements[i];

        if(currentMeasureChildElement.id == note) noteElementIndex = i;

        //if the line is one of the lines on the staff
        if(currentMeasureChildElement.className == 'line' && currentMeasureChildElement.getAttribute('data-on-staff') == 'onStaff') bottomBarLineIndex = i;
    }

    if(measureChildElements[noteElementIndex].className == 'line')
    {

        noteImg.src = wholeNoteLineUrl;
    }

    //note is above or in staff
    if(noteElementIndex <= bottomBarLineIndex)
    {

       //for notes above the staff
       for(let j = bottomBarLineIndex - 9; j >= noteElementIndex; j--)
       {

        //assign note above staff image if it is above the staff
        if(measureChildElements[noteElementIndex].className == 'space' && noteElementIndex > bottomBarLineIndex)
        {
            noteImg.src = wholeNoteAboveUrl;
        }

        if(measureChildElements[noteElementIndex].className == 'space')
        {
            accidentalImg.style.marginLeft = `${noteLeftMargin - 0.75}vw`;
        }
        else if(measureChildElements[noteElementIndex].className == 'line')
        {
            accidentalImg.style.marginLeft = `${-1.25}vw`;
        }

         //if element is line and white
         if(measureChildElements[j].className == 'line' && currentMeasureChildElement.style.backgroundColor == 'white')
         {
            if(j != noteElementIndex) measureChildElements[j].style.backgroundColor = 'black';

            measureChildElements[j].style.width = '4.25vw';
            measureChildElements[j].style.marginLeft = `${noteLeftMargin}vw`;


         }
       }

        //if note is in or on the staff
        if(noteElementIndex <= bottomBarLineIndex && noteElementIndex > (bottomBarLineIndex - 9))
        {
            noteImg.style.marginLeft = `${noteLeftMargin}vw`;
            accidentalImg.style.marginLeft = `${noteLeftMargin - 0.75}vw`;
        }
    }
    //note is below top line of staff
    else
    {
        //if note is in space
        //assign note below staff image
        if(measureChildElements[noteElementIndex].className == 'space')
        {
            noteImg.src = wholeNoteBelowUrl;
            accidentalImg.style.marginLeft = `${noteLeftMargin - 1.25}vw`;
        }
        //if note is on line
        else
        {
            accidentalImg.style.marginLeft = '-1.25vw';
        }

        for(let j = bottomBarLineIndex + 1; j <= noteElementIndex; j++)
        {
            //change white lines from staff up to note to black
            if(measureChildElements[j].className == 'line' && currentMeasureChildElement.style.backgroundColor == 'white')
            {
                if(j != noteElementIndex) measureChildElements[j].style.backgroundColor = 'black';

                measureChildElements[j].style.width = '4.25vw';
                measureChildElements[j].style.marginLeft = `${noteLeftMargin}vw`;
            }
        }

    }

    measureChildElements[noteElementIndex].style.zIndex += 1;

    if(measureChildElements[noteElementIndex].className == 'space') noteImg.style.marginLeft = `${noteLeftMargin}vw`;

    let accidentalImgElement = measureChildElements[noteElementIndex].appendChild(accidentalImg);

    measureChildElements[noteElementIndex].appendChild(noteImg);

}

//gets a random diatonic note between two given notes
function getRandomDiatonicNote(minNote, maxNote) {
  // Define the diatonic notes
  const diatonicNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  // Extract the pitch and octave of the minimum and maximum notes
  const minPitch = minNote.slice(0, -1);
  const maxPitch = maxNote.slice(0, -1);
  const minOctave = parseInt(minNote.slice(-1));
  const maxOctave = parseInt(maxNote.slice(-1));

  // Generate a random pitch between the minimum and maximum pitch
  const randomPitchIndex = Math.floor(Math.random() * (diatonicNotes.indexOf(maxPitch) - diatonicNotes.indexOf(minPitch) + 1)) + diatonicNotes.indexOf(minPitch);
  const randomPitch = diatonicNotes[randomPitchIndex];

  // Generate a random octave between the minimum and maximum octave
  const randomOctave = Math.floor(Math.random() * (maxOctave - minOctave + 1)) + minOctave;

  // Combine the random pitch and octave to create the random diatonic note
  const randomDiatonicNote = randomPitch + randomOctave;

  return randomDiatonicNote;
}

//generates a random clef
function getRandomClef()
{
    const clefs = ['alto', 'tenor', 'bass', 'treble'];
    const randomIndex = Math.floor(Math.random() * clefs.length);
    return clefs[randomIndex];
}

//generates a random accidental
function getRandomAccidental()
{
    const accidentals = ['natural', 'flat', 'sharp'];
    const randomIndex = Math.floor(Math.random() * accidentals.length);
    return accidentals[randomIndex];
}