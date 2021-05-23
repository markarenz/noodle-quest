# Quarantine Project: Nodle Quest

Although it's only been a month or so, trying to remember what life was like prior to COVID 19 is a lot like the history lesson from Mad Max Beyond Thunderdome where we talk about social gatherings and travel as part of "the before times." As I recall, most of my weeknights and a fair number of weekends were spoken for, leaving little time for research and exploration. Now, however, I'm in the same thumb-twiddling place in which most of us find ourselves: I've got time on my hands, and I've already watched all of Tiger King. In other words, I had time to take on a long-form exercise in SVG animation and optimizing React state handling for large data sets. Oh, and it's also a game, too.

Noodle Quest is an adventure game for young people. You run around a strange isometric world, exploring dungeons, feeding animals and gathering noodles for lunch. It's a simple idea, and fairly fun to play, but fun is not the primary purpose. 

Naturally, I could have built this in an engine like Unity much faster, and in many ways it would be better. However, that would miss the point by a mile. When making web apps, it's often the case that you can get away with inefficient patterns because the end user would never notice. In a game, however, these issues become quite apparent. In an industry where we are constantly learning, sometimes the best exercise is to put yourself in a position where half-done is not done at all, where you have no choice but to rebuild something multiple times until it meets the standard. 

That's why I enjoy making games. Certainly, it's fun, but it's also a fantastic way to grow your skills related to UI design and execution. Ten years ago, I'd amassed a library of more than 30 Flash games and sold several to sites like Miniclip. I learned more about AS2 and AS3 than I ever could have from reading the many books out there on the subject. The same is true of my iOS work. Making Highlights Hidden Pictures was a master class in designing a game as a system from the inside out.

## Isometric Controls

I've always loved isometric games. In my Flash days, I made loads of them, though every time players complained about controls. Isometric is great when you have a controller and you can just indicate diagonal axes rather than up/down/left/right. It can be highly confusing for players. So, in addition to keyboard support (W = North, A = South, S = East, Q = West) we have buttons laid out in the same shape as the isometric tile to make things simple and understandable.

The action button is in the middle of all of it. Now, naturally, buttons in web browsers want to have rectangular hit boxes. That's going to cause havoc when mobile players try to tap the action buttons and go east instead. The solution is relatively simple, though I don't see it implemented very often.

```
<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" className={`${css.tileBtnSvg}`}>
   <path
      onClick={() => handleClick(btn)}
      d="M 0, 10 L 20, 0 L 40, 10 L 20, 20 Z"
      strokeWidth="1"
      className={css.btnBg}
   />
   {
      (btn.lbl === 'n') && <path
         d="M 10, 13 L 14, 15 L 24, 10 L 30, 13 L 28, 6 L 14, 5 L 20, 8 Z"
         fill="white"
         className={`${css.btnIcon} ${availableActions.includes('n') && css.active}`}
      />
   }
...


```

As you can see, we can add an onClick to the path itself. This solves the problem, but it will cause your ES6 linter to complain. Just turn off no-noninteractive-element-interactions or disable it with an eslint-disable comment. Easy.



## Animating SVG Graphics

### Dance, little junebug

CSS animations using SVG are incredibly powerful. I've done this in a variety of ways in the past. The easiest way is to use transform on various pieces of an SVG object, the paths, lines, circles, etc., to achieve the desired effect. This works well enough, but if you wan to morph the shape of a line, you need something else.

Enter the "d" property. You can animate any property in an SVG element, though you may have to do some formatting. For example, the d property must be wrapped in "path()" to work properly. Here's one example:

```
.legLeft{
  transition: $walkCycleLength all ease-in-out;
  d: path("M 12,15 C 12,15 12,19 11,19");
  &.faceE{
    &.moving{
      d: path("M 12,15 C 14,17 13,19 13,19");
      animation: legWalkLE $walkCycleLength ease-in-out 0s infinite alternate;
    }
  }
}
@keyframes legWalkLE {
  from {
    d: path("M 12,15 C 12,15 12,19 11,19");
  }
  to {
    d: path("M 12,15 C 14,17 13,19 13,19");
  }
}
```

However, this only works with Chrome. So, as fantastic and maintainable as that is, it won't work. Believe me, once you've done animations for all 4 limbs and hands multiplied by 4 directions, the last thing you want to accept is that you need to rip and rebuild, but that's precisely what I did.

The more universal approach is to use the <animate> element within the SVG child element. If you want a circle to move up and down, create an animate element within the circle tags that maps the attribute cx to the needed values. Here's an example of that:

```
<circle className={`${css.footRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} cx="4" cy="5" r=".75" fill="#333">
   <animate
      attributeName="cx"
      values={getAnimatedFootVals(cx_foot_r, 'cx')}
      dur=".8s"
      repeatCount="indefinite"
   />
   <animate
      attributeName="cy"
      values={getAnimatedFootVals(cx_foot_r, 'cy')}
      dur=".8s"
      repeatCount="indefinite"
   />
</circle>
<path className={`${css.legRight} ${stepClasses[playerStep]} ${directionClasses[playerFacing]}`} stroke="#333" strokeWidth=".5" fill="transparent">
   <animate
      attributeName="d"
      values={getAnimatedLimbVals(d_leg_r)}
      dur=".8s"
      repeatCount="indefinite"
   />
</path>
```

Bear in mind, this is just the right leg and right foot for one direction. These describe 2 poses for each direction that alternate as the player walks. You can see, for example, how the animate element is wrapped by the circle element for the player's right foot. There are two animate elements here since we are animating 2 separate attributes. For the more complex path animation of the leg, we only need the d attribute to animate. getAnimatedLimbVals is a function that returns the path values for the various animations from a data file elsewhere in the project.

We also built out a "blink" animation, a burst of yellow lines, that appears when the player picks something up or performs an action. The blink uses the same techniques. The component is made up of 8 lines that animate on and off based on <animate> tags. To prevent hiccups when the player does two things in quick succession, we have multiple Blink components and the Game component alternates between them to avoid issues.

So far, so good. We have 4 facing directions with 2 idle animations each. The wings on the back are looking great. Are we done?

### Oh, Firefox. You scamp!

Nearly finished, or at least I thought I was nearly finished, I checked the game on Firefox again. Oh, no. The legs and arms aren't animating, and the hands and feet are just sticking to the 0,0 point since the cx and cy are not being set at all. Also, the Blink animations are just a sad yellow dot.

It turns out that Firefox employs a newer version of the SVG spec. While other browsers are using 1.1, Firefox supports v2, even though the documentation I found admitted that v2 is not finalized. 

No worries, though. It turned out that the new spec is just being pickier about the implementation than Safari or Chrome. The durations needed leading zeroes. Instead of ".8s" it wanted to see "0.8s" - why that matters so much to Firefox is a mystery for the ages. Regardless, the project was back on track.



## Data Management

The trick with a game like this is getting hundreds of tiles to move as the player moves. That means reducing the lift required by the web browser whenever possible. The first version of the game had a simple 10x10 grid and an array of tiles and an array of objects. As the game grew, it was clear that this approach would never scale.

The first improvement was to take both state objects and split them into sections or floors. While on the initial map, area 0, we don't need to peek into or mutate items or areas outside that map. So, we had an object with keys for each floor and, within each, an array of items or tiles.

This gave us a noticeable performance boost, but on mobile, we still needed help. This was especially clear when we take an item from the map and add it to our inventory.

I split the inventory out to its own state object and turned the inventory arrays into objects using the item ID as the key. This improved things enormously - after an afternoon of refactoring and testing, of course.

```
const removeItemFromInventory = (objId) => {
   setInventory(inventory.filter(item => item.id !== objId));
};
const addItemToInventory = (item) => {
   setInventory( inv => [...inv, item]);
};
const removeItemFromItems = (objId) => {
   const floor = {
      ...itemsState[playerPos.z],
   };
   delete floor[objId];
   setItemsState({
      ...itemsState,
      [playerPos.z]: floor,
   });
};
```

The other thing I noticed was unnecessary re-rendering of items and tiles. Now, with a class component, we can just use PurComponent to help alleviate this issue. I'm using functional components whenever possible, though, so we're using memoized functions and React.useMemo() for the Tile and Item components.

```
// Example of memoized Tile component
const Tile = ( {} ) => {
...
}
const M_Tile = React.memo(Tile);
export default M_Tile;

// memoized function to display items on a layer above the player
const display_items1 = React.useMemo(() => itemIdsLayer1.map((id, idx) => <Item
   key={idx}
   item={itemsState[playerPos.z][id]}
   calcXPos={calcXPos}
   calcYPos={calcYPos}
   calcZPos={calcZPos}
   gameScale={gameScale}
   numNoodles={numNoodles}
   maxNoodles={maxNoodles}
/>), [itemIdsLayer1, gameScale, itemsState, numNoodles, playerPos.z]);
```

After this was accomplished, I was able to plant temporary console commands in the code to confirm that the app was not triggering re-renders unless our dependent variables changed.


## Starting the app

- "npm start" is all you really need
- You can run the editor by navigating to /editor
    - Use the "copy areas" and "copy items" to paste the data into the /src/data/areaData.js and itemData.js files.
