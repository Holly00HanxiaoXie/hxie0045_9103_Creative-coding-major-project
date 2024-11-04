# hxie0045_9103_Creative-coding-major-project


**Interaction Instructions**
Based on the group work code, I chose to add **audio** to create interaction. There are two buttons on the canvas: play and pause. When the play button is pressed, the pattern on the canvas starts to **move** with the frequency of the music, and when it touches the edge of the canvas, it will return (it will not leave the canvas). When the pause button is pressed, the pattern on the canvas will disappear, but a sentence "play to start" will appear on the canvas.

**Inspiration**
Inspiration 1
![the first inpiration](/inspiration/WechatIMG1846.jpg)
https://openprocessing.org/sketch/2109271
The first inspiration was that randomly shaped rectangles moved at a constant speed on the same horizontal line. Maybe I could let the pattern change the speed of horizontal movement according to the frequency of the audio.

Inspiration 2
![the first inpiration](/inspiration/WechatIMG1849.jpg)
https://openprocessing.org/sketch/1988940
My second inspiration is a complex geometry that changes shape according to music. The geometry in the combined pattern will grow and shrink with the music at a fixed position. Because our pattern is also a complex figure composed of geometry, perhaps the scale of the geometry of a part of the pattern can be changed through audio.

**A brief technical explanation**
To achieve the interaction between music and pattern, I did not have to change too much in the original group work code. Most of the changes were in the class PatternManager. First, I added music and two buttons to control the music, and then added moveRandomly() to the class CircularPattern to achieve the interaction between pattern and music.

