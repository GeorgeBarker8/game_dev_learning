const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// SIZE VIEPORT
canvas.width = 1024
canvas.height = 576
// -------------

//COLLISION
const collisionMap = []

for (let i = 0; i < collisions.length; i+=70) {
    collisionMap.push(collisions.slice(i, 70 + i))    
}
//---------------------------

const boundaries = []
const offset = {
    x: -900,
    y: -500,
}



collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1019) 
        boundaries.push(new Boundary({position: {
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height + offset.y,
    }}))
    })
})



// This how we create image in HTML with JS
const image = new Image()
image.src = './img/test room.png'

//------------------------------

const foregroundImage = new Image()
foregroundImage.src = './img/foreground.png'

// PLAYER
const playerImageDown = new Image()
playerImageDown.src = './img/walk_down.png'

const playerImageUp = new Image()
playerImageUp.src = './img/walk_up.png'

const playerImageLeft = new Image()
playerImageLeft.src = './img/walk_left.png'

const playerImageRight = new Image()
playerImageRight.src = './img/walk_right.png'

//----------------------------




const player = new Sprite ({
    position: {
        x: canvas.width / 2 - 198 / 4 / 2,
        y: canvas.height / 2 - 192 / 4 / 2,
    },
    image: playerImageDown,
    frames: {
        max: 4
    },
    sprites: {
        down: playerImageDown,
        up: playerImageUp,
        left: playerImageLeft,
        right: playerImageRight,
    }
})


const background = new Sprite({position: {
    x: offset.x,
    y: offset.y
},
    image: image
})

const foreground = new Sprite({position: {
    x: offset.x,
    y: offset.y
},
    image: foregroundImage
})


const keys = {
    w: {
        pressed: false 
    }
    ,
    a: {
        pressed: false 
    }
    ,
    s: {
        pressed: false 
    }
    ,
    d: {
        pressed: false 
    }
    ,
}


const movables = [background, ...boundaries, foreground]



function rectangularCollision({rec1, rec2}) {
 return (
    rec1.position.x + rec1.width >= rec2.position.x &&
    rec1.position.x <= rec2.position.x + rec2.width &&
    rec1.position.y <= rec2.position.y + rec2.height &&
    rec1.position.y + rec1.height >= rec2.position.y )
}


//ANIMATION LOOP
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach (boundary => {
        boundary.draw()     
    })
    player.draw()
    foreground.draw()


let moving = true

player.moving = false

//MOVEMENT
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rec1:player,
                    rec2:{...boundary, position: {
                        x:boundary.position.x,
                        y:boundary.position.y + 3
                    }},
                })
                ) {
                    moving = false
                    break
                }
        }

        if (moving)
        movables.forEach(movable => {movable.position.y += 3})
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rec1:player,
                    rec2:{...boundary, position: {
                        x:boundary.position.x + 3,
                        y:boundary.position.y 
                    }},
                })
                ) {
                    moving = false
                    break
                }
        }

        if (moving)
        movables.forEach(movable => {movable.position.x += 3})
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rec1:player,
                    rec2:{...boundary, position: {
                        x:boundary.position.x,
                        y:boundary.position.y - 3
                    }},
                })
                ) {
                    moving = false
                    break
                }
        }

        if (moving)
        movables.forEach(movable => {movable.position.y -= 3})
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rec1:player,
                    rec2:{...boundary, position: {
                        x:boundary.position.x - 3,
                        y:boundary.position.y 
                    }},
                })
                ) {
                    moving = false
                    break
                }
        }

        if (moving)
        movables.forEach(movable => {movable.position.x -= 3})
    }
//----------------------------
}

animate()
let lastKey = ''


//----------------------------


window.addEventListener('keydown', (e) => {
    switch (e.key)  {
        case 'w' :
keys.w.pressed = true
lastKey ='w'
        break

        case 'a' :
keys.a.pressed = true
lastKey ='a'
        break

        case 's' :
keys.s.pressed = true
lastKey ='s'
        break

        case 'd' :
keys.d.pressed = true
lastKey ='d'
        break

    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key)  {
        case 'w' :
keys.w.pressed = false
        break

        case 'a' :
keys.a.pressed = false
        break

        case 's' :
keys.s.pressed = false
        break

        case 'd' :
keys.d.pressed = false
        break

    }
})


//-----------------------------------------------------------------------------------------------

