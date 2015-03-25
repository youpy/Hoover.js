# Hoover.js

A JavaScript library to play hoover sound on Web Audio API.

It is (almost) compatible with [OscillatorNode interface](http://webaudio.github.io/web-audio-api/#the-oscillatornode-interface).

## Installation

### Browser

- https://raw.githubusercontent.com/youpy/Hoover.js/master/build/js/hoover.js
- https://raw.githubusercontent.com/youpy/Hoover.js/master/build/js/hoover.min.js

```html
<script src="hoover.min.js"></script>
```

### npm

```
npm install hoover.js
```

```javascript
require('web-audio-test-api');
var Hoover = require('hoover.js');
```

## Usage

```javascript
var hoover = new Hoover(new AudioContext());
hoover.connect(hoover.context.destination);
hoover.start();
```

## See also

- https://en.wikipedia.org/wiki/Hoover_sound
- http://d.hatena.ne.jp/aerodynamik/20110621/p1
- http://www.mcld.co.uk/blog/blog.php?254
- https://www.youtube.com/watch?v=-FYfRSTvspk
