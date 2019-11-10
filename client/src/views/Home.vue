<template>
    <div id="home">
        <div id="navbar">
            <nav id="nav" class="navbar navbar-dark">
                <div id="nav-container">
                    <img id="nav-logo" src="https://i.imgur.com/gMfJ8nX.png" alt="" srcset="">
                    <h3 style="color: white; font-weight: bold; margin-left: 5px">WordCross</h3>
                </div>
            </nav>
        </div>
        <b-container>
            <div id="home-container">
                <div id="home-container-header">
                    <h1 id="quote">Be ready whenever, wherever</h1>
                    <h1 id="quote" style="margin-bottom: 15px">inspiration strikes.</h1>
                    <h3 id="small-quote">Get WordCross's features by joining us!</h3>
                </div>
                <div id="home-container-body">
                    <button type="button" @click="displayLogin()" class="btn btn-outline-light btn-lg home-btns">Login</button>
                    <button type="button" @click="displayRegister()" class="btn btn-outline-light btn-lg home-btns">Register</button>
                </div>
                <div id="home-container-footer">
                    <img id="home-img" src="https://i.imgur.com/toFsiLr.png" alt="" srcset="">
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'Home',
    props: ['displayLogin', 'displayRegister']
}
</script>

<style scoped>
#nav {
    background-color:#0087BE;
}

#nav-container {
    display: flex;
    align-items: center;

}

#nav-logo {
    height: 50px;
}

#home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 92vh;
}

#home-img {
    height:400px;
}
.home-btns {
    margin-left: 20px;
}

#quote{
    color: white;
    font-size: 60px;
    font-family: 'Titillium Web', sans-serif;
}

#small-quote {
    color: #78DCFA;
    font-family: 'Titillium Web', sans-serif;
}

.home-btns {
    height: 70px;
    width: 200px;
}

</style>