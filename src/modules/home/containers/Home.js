import React from 'react';
import { Grid, Container, Drawer, IconButton } from '@material-ui/core';
import { Close as IconClose, PlayArrow as IconPlay, LiveHelp as IconInfo, ExitToApp as IconExit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Noodle } from '../components';
import css from '../css/home.module.scss';

const Home = () => {
    const explainerContent = [
        {
            image: 'noodle.svg',
            title: 'Your Quest',
            html: `You're a hungry young junebug, adventuring around this strange land in search of something good for lunch. <b>Noodles</b> sound good. Your epic quest: <b>find all 10</b> magical noodles!`,
        },
        {
            image: 'bowl.svg',
            title: 'The Bowl',
            html: `Take your noodles to the <b>big bowl</b> and tap the noodle icon in your inventory to add them in. Once you have all 10, it's lunchtime!`,
        },
        {
            image: 'bear.svg',
            title: 'Animals',
            html: `You may encounter several animals on your journey. They will move out of your way once you <b>feed them</b>. Keep an eye out for items that the animals might like to eat. Note: it's OK to feed wild animals here because this is a game and not real life. It's not a good idea to feed wild animals in real life.`,
        },
        {
            image: 'salmon.svg',
            title: 'Tools',
            html: `Some items require a bit more work. A fish, for example requires finding the <b>fishing rod</b> and finding a pond with a fish in it. The fish will appear on top of the water - these are flying fish, apparently.`,
        },
        {
            image: 'teleporter.svg',
            title: 'Teleporter',
            html: `Keep an eye out for the teleporter. Once you find it, you can <b>fast-travel</b> to spots you've visited in the past. It's a very handy item and well worth figuring out how to access it.`,
        },
        {
            image: 'marker.svg',
            title: 'Markers',
            html: `You will see these <b>little flags</b> scattered throughout the map. Be sure to walk over them. Those spots become available on your teleporter menu.`,
        },
    ];
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    return (
        <div className={css.home}>
            <div className={css.bg}>
                <div className={css.lines1} />
                <div className={css.lines2} />
                <div className={css.lines3} />
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle1}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle2}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle3}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle4}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle5}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle6}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle7}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle8}`} />*/}
                {/*<img src="/images/home/noodle.svg" alt="noodle" className={`${css.noodle} ${css.noodle9}`} />*/}
                <Noodle delay={0.5}/>
                <Noodle delay={1}/>
                <Noodle delay={1.5}/>
                <Noodle delay={2}/>
                <Noodle delay={2.5}/>
                <Noodle delay={3}/>
                <Noodle delay={3.5}/>
                <Noodle delay={4}/>
                <Noodle delay={4.5}/>
                <Noodle delay={5}/>
                <Noodle delay={5.5}/>
            </div>
            <div className={css.shader} />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} align="center">
                        <img src="/images/home/logo.svg" className={css.logoImg} alt="Noodle Quest" />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <button
                            className={`${css.menuButton} ${css.btnInfo}`}
                            onClick={toggleDrawer}
                        >
                            <IconInfo className={css.btnIcon}/> What is this?
                        </button>
                        <Link to="/game">
                            <button
                                className={`${css.menuButton} ${css.btnPlay}`}
                            >
                                <IconPlay className={css.btnIcon}/> Play
                            </button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>

            <Drawer
                open={drawerOpen}
                anchor='right'
                onClose={toggleDrawer}
                className={css.drawer}
            >
                <div className={css.drawerContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} align="right">
                            <div className={css.closeWrap}>
                                <IconButton onClick={toggleDrawer}>
                                    <IconClose/>
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>It's <b>lunchtime</b>, adventurer!</h2>
                        </Grid>

                        {
                            explainerContent.map((item, idx) => <Grid container spacing={0} key={idx}>
                                <Grid item xs={12} sm={9}>
                                    <div className={css.inner}>
                                        <h3>{item.title}</h3>
                                        <div className={css.explainerContent} dangerouslySetInnerHTML={{__html: item.html}}/>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} align="center">
                                    <div className={css.inner}>
                                        <img src={`/images/home/${item.image}`} alt={item.title} className={`${css.explainerImg} ${idx % 2 === 0 && css.alt}`} />
                                    </div>
                                </Grid>
                            </Grid>)
                        }

                        <Grid item xs={12}>
                            <p>
                                <b>Movement:</b> Use the <b>buttons</b> at the bottom of the screen to move. The center button with the X on it is an action button. Use it to take an item or go up or down on a ladder. There are characters to talk to. Walk onto their square to start a conversation.

                                You can also use <b>QWAS keys</b> to move around, and the <b>spacebar</b> is the action button.
                            </p>
                        </Grid>

                        <Grid item xs={12} align="center" style={{ marginTop: 30, marginBottom: 30 }}>
                            <button className={css.menuButton} onClick={toggleDrawer}><IconExit className={css.btnIcon}/> Done</button>
                        </Grid>


                    </Grid>
                </div>
            </Drawer>


        </div>
    )
};

export default Home;
