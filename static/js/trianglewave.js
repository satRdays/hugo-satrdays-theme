(function () {
  
  var sqwidth,
  largeSide,
  halfLargeSide,
  unitSize,
  raster, mesh = [], restizeTime,
  darken;

  function init () {

    var w = getViewport().width;
    if (w < 720) {
        noAnim = true;
    }

    sqwidth = getSqSize();
    largeSide = hypotenuse(sqwidth);
    halfLargeSide = largeSide / 2;
    unitSize = new Size(sqwidth, sqwidth);
    raster = new Raster(getImg());
    drip = [];

    raster.on('load', function() {

      raster.fitBounds(view.bounds, true);
      loaded = true;

      darken = Shape.Rectangle(new Point(0,0), view.size);
      darken.bringToFront();

      darken.fillColor =  'rgba(100, 100, 200, 0.5)';
      darken.blendMode = 'multiply';
      darken.opacity = 1;

      var startX = view.center.x - Math.ceil(view.center.x / largeSide) * largeSide;
      var next = [
        startX,
        view.center.y - Math.ceil(view.center.y / largeSide) * largeSide
      ];

      var line = 0;
      var end = false;

      while(next) {
        var res = generateSquare(next, line, mesh);
        var pre = (line % 4 == 0) ? 1 : -1;

        if (res[0] > view.size.width && res[1] > view.size.height && end == false) {

          end = line + 1
          res[0] = startX + (pre * halfLargeSide/2);
          res[1] = next[1] + halfLargeSide;
          line += 2;

        } else if (res[0] > view.size.width) {
          if (end) {
            next = false;
            break;
          }
          res[0] = startX + (pre * halfLargeSide/2);
          res[1] = next[1] + halfLargeSide;
          line += 2;
        } else {
          res[0] = next[0] + largeSide;
          res[1] = next[1]
        }
        next = res;
      }

    });
  }

  function wavePoint (point, line, pre) {
    var l = line + Math.sin(line);
    return 0.5 * Math.pow(
      Math.sin(
        ( point.x + l + (pre * sqwidth/2) ) / 3
      ), 2
    ) + 0.2
  }

  function generateSquare (coords, line, mesh) {
    var x = coords[0],
        y = coords[1];
    var rand = [];
    rand = (Math.random() > 0.55) ?  [0,2] : [1,3]

    var center = new Point(x-(halfLargeSide), y-(halfLargeSide))

    var triangle1 = new Path.Rectangle(center, unitSize);
    triangle1.removeSegment(rand[0]); // 0
    triangle1.rotate(45);
    triangle1.opacity = wavePoint(center, line, 1)
    triangle1.JSCwaveProp = [center, line, 1]
    triangle1.passive = true;
    triangle1.fillColor= darken.fillColor;
    triangle1.on('mouseenter', onMouseEnter)

    mesh.push(triangle1)

    var triangle2 = new Path.Rectangle(center, unitSize);
    triangle2.removeSegment(rand[1]); // 2
    triangle2.rotate(45);
    triangle2.opacity = wavePoint(center, line+1, -1)
    triangle2.JSCwaveProp = [center, line+1, -1]
    triangle2.passive = true;
    triangle2.fillColor= darken.fillColor;
    triangle2.on('mouseenter', onMouseEnter)

    mesh.push(triangle2)

    return [x+(halfLargeSide), y+(halfLargeSide)];

  }

  function hypotenuse (a) {
    return Math.sqrt(Math.pow(a, 2) * 2);
  }

  function getViewport () {
    return {
      ratio: window.devicePixelRatio &&  window.devicePixelRatio > 1 ? 2 : 1,
      width: (window.innerWidth > 0) ? window.innerWidth : screen.width
    }
  }

  function getImg () {
    return 'img/header-bg.jpg';
  }

  function getSqSize () {
    return (getViewport().width > 900) ? 64 : 28;
  }

  function remove (item) {
    item.remove();
    item = null;
    return null;
  }

  function reset () {
    view.onFrame = function () {}
    raster.remove();
    darken.remove()
    mesh = mesh.map(remove);
    mesh = [];
    project.clear();
  }

  function setSize () {
    var c = document.getElementById('Trianglewave').parentNode;
    view.viewSize.width = c.clientWidth;
    view.viewSize.height = c.clientHeight;
  }

  function onMouseEnter () {
    this.passive = false;
    this.opacity = 1;
    //var prop = this.JSCwaveProp;
  }

  /*function withinRadius (currentPoint, centerPoint, outerRadius, innerRadius) {
    var coords = (Math.pow((currentPoint.x - centerPoint.x),2) + Math.pow((currentPoint.y - centerPoint.y),2)),
        insideOuter = coords < Math.pow(outerRadius,2),
        outsideInner = coords > Math.pow(innerRadius,2);
    return insideOuter && outsideInner;
  }*/

  /*function onFrame (e) {
    if (noAnim) return;
    if (window.menuOpen) return;

    mesh.map(function (tri, i) {
      if (tri.passive) {
        tri.JSCwaveProp[0] += e.delta * waveSpeed
        tri.opacity = wavePoint.apply(null, tri.JSCwaveProp);
      } else {
        tri.opacity -= .005

        if (tri.opacity <= mesh[i-1].opacity) {
          tri.opacity = mesh[i-1].opacity;
          tri.passive = true;
        }
      }
    });
  }*/

  function resize () {
    reset();
    setSize();
    init();
  }

  window.addEventListener('resize', function () {
    clearTimeout(restizeTime);
    restizeTime = setTimeout(resize, 400)
  });

  setSize();
  init();

})();
