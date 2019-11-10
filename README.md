FORMAT: 1A
HOST: http://localhost:3000/

# miniwordpress

miniwordpress is a wordpress clone website, you can post article using WYSIWYG, edit update and delete your article, you can also read public article

## User Register [/users/register]

### register [POST]
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071"
        }
        

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": "email is already been used"
        }

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "name is required",
                "email is required",
                "password is required"
            ]
        }
        
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@x",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": [
                "invalid email format"
            ]
        }

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "gajah"
        }
+ Response 400

        {
            "message": [
                 "password shold contain at least one digit, one lower case , one upper case , minumum 6 char"
            ]
        }

## User Login [/users/login]

### login [POST]
+ Request (application/json)

        {
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071"
        }
        

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "invalid email/password"
            ]
        }

## Articles [/articles/]

### Post article [POST]
+ Request (multipart/form-data)

        {
            "title": "code is fun",
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "image": "https://storage.googleapis.com/mini-temp-bucket/1573282779174rubi.png",
            "tags": "Vue,Javascript"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
              "data": {
                "featured_image": "https://storage.googleapis.com/mini-temp-bucket/1573282779174rubi.png",
                "tags": [
                  "Vue",
                  "javascript"
                ],
                "_id": "5dc663dc2f08eb187c8d4259",
                "title": "code is fun",
                "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                "author": "5dc22f605be4d50f0b3d9a53",
                "createdAt": "2019-11-09T06:59:40.405Z",
                "updatedAt": "2019-11-09T06:59:40.405Z"
              }
            }
        }

### Update article [PUT]
+ Request (multipart/form-data)

        {
            "title": "code is bad",
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "image": "https://storage.googleapis.com/mini-temp-bucket/1573282779174rubi.png",
            "tags": "Vue,google"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
              "data": {
                "featured_image": "https://storage.googleapis.com/mini-temp-bucket/1573282779174rubi.png",
                "tags": [
                  "Vue",
                  "google"
                ],
                "_id": "5dc663dc2f08eb187c8d4259",
                "title": "code is bad",
                "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                "author": "5dc22f605be4d50f0b3d9a53",
                "createdAt": "2019-11-09T06:59:40.405Z",
                "updatedAt": "2019-11-09T06:59:40.405Z"
              }
            }
        }

+ Response 400 (application/json)

        {
          "message": "not authorized"
        }

## Public Articles [/articles/public{?query1}]
### Get Public article [GET]

+ Parameters
    + query1 (optional) - A query variable


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
           {
              "data": [
                {
                  "featured_image": "https://storage.googleapis.com/mini-temp-bucket/1573317211903goran-ivos-idmvPhF8t4E-unsplash.jpg",
                  "tags": [
                    "Vue",
                    "Javascript"
                  ],
                  "_id": "5dc6ea5fd2601a1c3e5616d8",
                  "title": "Vue CLI 3.0 is here!",
                  "content": "<p>Over the past few months, we’ve been working really hard on the next generation of Vue CLI, the standard build toolchain for Vue applications. Today we are thrilled to announce the release of <a href=\"https://cli.vuejs.org/\" rel=\"noopener noreferrer\" target=\"_blank\">Vue CLI 3.0</a> and all the exciting features that come with it.</p><p><br></p><h1>Rich Built-in Features</h1><p>Vue CLI 3 is a completely different beast from its previous version. The goal of the rewrite is two-fold:</p><p><br></p><ol><li>Reduce configuration fatigue of modern frontend tooling, especially when mixing multiple tools together;</li><li>Incorporate best practices in the toolchain as much as possible so it becomes the default for any Vue app.</li></ol><p><br></p><p>At the core, Vue CLI provides a pre-configured build setup built on top of webpack 4. We aim to minimize the amount of configuration developers have to go through, so any Vue CLI 3 project comes with out-of-the-box support for:</p><ul><li>Pre-configured webpack features such as <a href=\"https://webpack.js.org/concepts/hot-module-replacement/\" rel=\"noopener noreferrer\" target=\"_blank\">hot module replacement</a>, <a href=\"https://webpack.js.org/guides/code-splitting/\" rel=\"noopener noreferrer\" target=\"_blank\">code-splitting</a>, <a href=\"https://webpack.js.org/guides/tree-shaking/#src/components/Sidebar/Sidebar.jsx\" rel=\"noopener noreferrer\" target=\"_blank\">tree-shaking</a>, <a href=\"https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31\" rel=\"noopener noreferrer\" target=\"_blank\">efficient long term caching</a>, <a href=\"https://webpack.js.org/configuration/dev-server/#devserver-overlay\" rel=\"noopener noreferrer\" target=\"_blank\">error overlays</a>, etc.</li><li>ES2017 transpilation (plus common proposals like object rest spread and dynamic import) and usage-based polyfills injection via Babel 7 + <a href=\"https://github.com/babel/babel/tree/master/packages/babel-preset-env\" rel=\"noopener noreferrer\" target=\"_blank\">preset-env</a></li><li>Support for PostCSS (with autoprefixer enabled by default) and all major CSS pre-processors</li><li>Auto-generated HTML with hashed asset links and preload/prefetch resource hints</li><li>Modes and cascading environment variables via <code>.env</code> files</li><li><a href=\"https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode\" rel=\"noopener noreferrer\" target=\"_blank\">Modern mode</a>: ship native ES2017+ bundle and legacy bundle in parallel (details below)</li><li><a href=\"https://cli.vuejs.org/config/#pages\" rel=\"noopener noreferrer\" target=\"_blank\">Multi-page mode</a>: build an app with multiple HTML/JS entry points</li><li><a href=\"https://cli.vuejs.org/guide/build-targets.html#app\" rel=\"noopener noreferrer\" target=\"_blank\">Build targets</a>: build Vue Single-File Components into a library or native web components (details below)</li></ul><p><br></p><p>In addition, there are many optional integrations that you can mix and match when you create a new project, such as:</p><ul><li><a href=\"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript\" rel=\"noopener noreferrer\" target=\"_blank\">TypeScript</a></li><li><a href=\"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa\" rel=\"noopener noreferrer\" target=\"_blank\">PWA</a></li><li><a href=\"https://router.vuejs.org/\" rel=\"noopener noreferrer\" target=\"_blank\">Vue Router</a> &amp; <a href=\"https://vuex.vuejs.org/\" rel=\"noopener noreferrer\" target=\"_blank\">Vuex</a></li><li><a href=\"https://eslint.org/\" rel=\"noopener noreferrer\" target=\"_blank\">ESLint</a> / <a href=\"https://palantir.github.io/tslint/\" rel=\"noopener noreferrer\" target=\"_blank\">TSLint</a> / <a href=\"https://prettier.io/\" rel=\"noopener noreferrer\" target=\"_blank\">Prettier</a></li><li>Unit Testing via <a href=\"https://jestjs.io/\" rel=\"noopener noreferrer\" target=\"_blank\">Jest</a> or <a href=\"https://mochajs.org/\" rel=\"noopener noreferrer\" target=\"_blank\">Mocha</a></li><li>E2E Testing via <a href=\"https://www.cypress.io/\" rel=\"noopener noreferrer\" target=\"_blank\">Cypress</a> or <a href=\"http://nightwatchjs.org/\" rel=\"noopener noreferrer\" target=\"_blank\">Nightwatch</a></li></ul><p><br></p><p><img src=\"https://miro.medium.com/max/1490/1*llJjroMC2YJWizrXOgCDuA.png\" width=\"1490\" height=\"726\"></p><p>Pick as much or as little as you want.</p><p>Most importantly, Vue CLI makes sure all the above features work nicely together so that you don’t have to do the plumbing yourself.</p><p><br></p><h1>Configurable with No Need to Eject</h1><p>All the features listed above work with zero configuration from your part: when you scaffold a project via Vue CLI 3, it installs the Vue CLI runtime service (@vue/cli-service), selected feature plugins, and generates the necessary config files for you. In most cases, you just need to focus on writing the code.</p><p><br></p><p>However, CLI tools that attempt to abstract away underlying dependencies often strip away the ability to fine-tweak the internal configurations for those dependencies —in order to make such changes, the user typically has to “eject”, i.e. checking the raw configurations into the project in order to make changes. The downside of this is that once you eject, you are on your own and won’t be able to upgrade to a newer version of the tool in the long run.</p><p>We acknowledge the importance of being able to get lower-level access to the configs, but we also don’t want to leave ejected users behind, so we’ve figured out a way for you to tweak almost all aspects of the configurations without ejecting.</p><p><br></p><p>For 3rd party integrations like Babel, TypeScript and PostCSS, Vue CLI respects the corresponding configuration files for these tools. For webpack, the user can either leverage <a href=\"https://github.com/survivejs/webpack-merge\" rel=\"noopener noreferrer\" target=\"_blank\">webpack-merge</a> to merge simple options into the final config, or <a href=\"https://cli.vuejs.org/guide/webpack.html#chaining-advanced\" rel=\"noopener noreferrer\" target=\"_blank\">precisely target and tweak existing loaders and plugins via webpack-chain</a>. In addition, Vue CLI ships with the <code><a href=\"https://cli.vuejs.org/guide/webpack.html#inspecting-the-project-s-webpack-config\" rel=\"noopener noreferrer\" target=\"_blank\">vue inspect</a></code> command to help you inspect the internal webpack configuration. The best part though, is that you don’t need to eject just to make small tweaks — you can still upgrade the CLI service and plugins to receive fixes and new features.</p><p><br></p><p><img src=\"https://miro.medium.com/max/1414/1*jiQtvLrGM4MP78tXaEhLRg.png\" width=\"1414\" height=\"506\">Using <a href=\"https://github.com/mozilla-neutrino/webpack-chain\" rel=\"noopener noreferrer\" target=\"_blank\">webpack-chain</a> to tweak the options for <a href=\"https://github.com/jantimon/html-webpack-plugin\" rel=\"noopener noreferrer\" target=\"_blank\">html-webpack-plugin</a></p><h1>Extensible Plugin System</h1><p>We want Vue CLI to be a platform the community can built upon, so we designed the new version with a plugin architecture from day one. A Vue CLI 3 plugin can be very powerful: it can inject dependencies and files during the app’s scaffolding phase, and tweak the app’s webpack config or inject additional commands to the CLI service during development. Most of the built-in integrations like TypeScript are implemented as plugins using the same <a href=\"https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/PluginAPI.js\" rel=\"noopener noreferrer\" target=\"_blank\">plugin API</a> that is available to all community plugins. If you are interested in writing your own plugin, check out the <a href=\"https://cli.vuejs.org/dev-guide/plugin-dev.html#service-plugin\" rel=\"noopener noreferrer\" target=\"_blank\">plugin dev guide</a>.</p><p><br></p><p>In Vue CLI 3 we no longer have “templates” — instead, you can create your own <a href=\"https://cli.vuejs.org/guide/plugins-and-presets.html#remote-presets\" rel=\"noopener noreferrer\" target=\"_blank\">remote preset</a> to share your selection of plugins and options with other developers.</p><h1>Graphical User Interface</h1><p>Thanks to the amazing work by <a href=\"https://medium.com/u/9bafe4e8ffdd?source=post_page-----c42bebe28fbb----------------------\" rel=\"noopener noreferrer\" target=\"_blank\">Guillaume CHAU</a>, Vue CLI 3 ships with a full-blown GUI that not only can create new projects, but also manage the plugins and tasks inside the projects (yes, it even comes with the fancy webpack dashboard shown below):</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/2750/1*gFc-hzoWXxts2VT40pic1Q.png\" width=\"2750\" height=\"1882\"></p><p>This does not require Electron — just launch it with `vue ui`.</p><blockquote>Note: although Vue CLI 3 is released as stable, the UI is still in beta. Expect a few quirks here and there.</blockquote><blockquote><br></blockquote><h1>Instant Prototyping</h1><p>It isn’t fun to wait for <code>npm install</code> before you can write any code. Sometimes we just need that instant access to a working environment to get that spark of inspiration flowing. With Vue CLI 3’s <code>vue serve</code> command, this is all you need to do to start prototyping with Vue single-file components:</p><p><br></p><p><img src=\"https://miro.medium.com/max/1490/1*3eLVIg4G46mc5nEte_tzzA.png\" width=\"1490\" height=\"854\"></p><p>Instant prototyping with `vue serve`</p><p>The prototyping dev server comes with the same setup of a standard app, so you can easily move the prototype<code>*.vue</code> file into a properly scaffolded project’s <code>src</code> folder to continue working on it.</p>",
                  "author": {
                    "_id": "5dc22f605be4d50f0b3d9a53",
                    "name": "Arnold Therigan",
                    "email": "yonathantherigan12345@gmail.com",
                    "password": "$2a$10$4M2fx9opyKj/mP4kWA.oA.ezZGbbRrSf3mlbTRD7jn7JBWGeSoxjS",
                    "createdAt": "2019-11-06T02:26:40.207Z",
                    "updatedAt": "2019-11-06T02:26:40.207Z"
                  },
                  "createdAt": "2019-11-09T16:33:35.761Z",
                  "updatedAt": "2019-11-09T16:33:35.761Z"
                },
                {
                  "featured_image": "https://storage.googleapis.com/mini-temp-bucket/1573317346384fatos-bytyqi-Agx5_TLsIf4-unsplash.jpg",
                  "tags": [
                    "Vue",
                    "Javascript"
                  ],
                  "_id": "5dc6eae9d2601a1c3e5616d9",
                  "title": "Component Communication in Vue.Js",
                  "content": "<p>In modern front-end frameworks, the entire page is divided into small pieces of components. Each component has its own functionality &amp; UI. Component-based architecture makes it easy to develop &amp; maintain an application. During development, you may come across a situation where you need to share data between with other components. In this post, we are going to learn about many possible ways of achieving communication between components.</p><blockquote>Vue.js allows component communication in the following ways:-</blockquote><blockquote>1. Parent to child communication (Using Props).</blockquote><blockquote>2. Child to parent communication (Using Events).</blockquote><blockquote>3. Communication between any component (Using Event Bus).</blockquote><h1><strong>1. Parent to child communication:</strong></h1><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/312/1*aFJ3be1xdyAM9fW5pGPEDA.jpeg\" width=\"312\" height=\"402\"></p><p>In this type of communication, a parent passes the data to child by adding an argument in the component declaration.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/892/1*9JGe13zRQe-t4k7_sJzZMQ.png\" width=\"892\" height=\"541\"></p><p>Parent component</p><p>Consider the above code. Here we have added an argument “<strong>message</strong>” in the child component declaration. For dynamically setting the value we have to add “ <strong>:</strong> ” before the argument.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/547/1*Pu5M49a-Pe4MgZg8doqpcQ.png\" width=\"547\" height=\"345\"></p><p>Child Component</p><p>In our child component, we have added an input argument “<strong>message</strong>” along with the data type “<strong>String</strong>”.</p><p>Props provide only one-way communication from a parent to child but vice-versa is not possible. Any changes in the values of an attribute/argument in the prop is directly reflected in the child.</p><p>But what if you want to call a method inside <strong>child component</strong> when the value is changed.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/719/1*0Dum2EgxQ_tkhfBQ_b6vJA.png\" width=\"719\" height=\"564\"></p><p>Trigger action when props is changed</p><p>In the above example, we have added a property “<strong>watch</strong>” inside which a function to invoke the <strong>callMe()</strong> method is declared. This will ensure that when the value is changed <strong><em>callMe()</em></strong> function will be invoked.</p><h1>2. Child to parent communication</h1><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/301/1*NBQQiOlbE89USqJZIQWk5A.jpeg\" width=\"301\" height=\"391\"></p><p>In this type of communication, Events ensures communication from child to parent.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/797/1*Ck4dOSEw3mh6O9_azbn8aA.png\" width=\"797\" height=\"252\"></p><p>Child component</p><p>Here in the “<strong>ChildComponent</strong>” we are firing an event that emits a message and its parent can get this message using the “<strong>v-on:</strong>” directive.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/935/1*NBn71-SsmYhALzgW-azmsQ.png\" width=\"935\" height=\"540\"></p><p>Parent component</p><p>In events, arguments are optional. You can pass ’<strong>n</strong>’ number of arguments. When child component will fire the event “<strong>messageFromChild()</strong>”, “<strong>childMessageReceived()</strong>” function will be called.</p><h1>3. Communication between any components using Event Bus</h1><p>Event Bus is not limited to a parent-child relation. You can share information between any components.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/774/1*Oq9AF9t0SQXMZ1UIxXZr7A.png\" width=\"774\" height=\"246\"></p><p>Abc Component</p><p>In the above <strong>AbcComponent</strong>, we are firing an event “<strong>message_from_abc</strong>” and passing arguments. Arguments are optional here. Any other component can listen to this event.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/767/1*Et38YB2zEiIIMJI9wcjSqw.png\" width=\"767\" height=\"285\"></p><p>Xyz Component</p><p>In <strong>XyzComponent</strong> to listen an event, we have to register it first. We can do so by putting an event listener inside <strong>mounted()</strong> callback. This callback will be triggered when an event is fired from any component.</p><p><br></p><p><br></p><p><img src=\"https://miro.medium.com/max/360/1*SuBB3WCSIfRrOPJxs72pjg.gif\" width=\"360\" height=\"260\"></p><p>giphy.com</p><p>Alternatively, we can use <a href=\"https://vuex.vuejs.org/\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>Vuex</strong></a> a <strong>redux</strong> based state management tool for Vue.</p><p>We’ll discuss <strong>Vuex</strong> on my next article. Stay tuned….</p>",
                  "author": {
                    "_id": "5dc22f605be4d50f0b3d9a53",
                    "name": "Arnold Therigan",
                    "email": "yonathantherigan12345@gmail.com",
                    "password": "$2a$10$4M2fx9opyKj/mP4kWA.oA.ezZGbbRrSf3mlbTRD7jn7JBWGeSoxjS",
                    "createdAt": "2019-11-06T02:26:40.207Z",
                    "updatedAt": "2019-11-06T02:26:40.207Z"
                  },
                  "createdAt": "2019-11-09T16:35:53.718Z",
                  "updatedAt": "2019-11-09T16:35:53.718Z"
                }
              ]
            }
        }
        
## Public Articles Detail [/articles/public{id}]
### Get Public article detail [GET]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
           {
              "data": [
                {
                  "featured_image": "https://storage.googleapis.com/mini-temp-bucket/1573213662610goran-ivos-idmvPhF8t4E-unsplash.jpg",
                  "tags": [],
                  "_id": "5dc555e2a243e012b20caa7a",
                  "title": "code is fun",
                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                  "author": {
                    "_id": "5dc22f605be4d50f0b3d9a53",
                    "name": "Arnold Therigan",
                    "email": "yonathantherigan12345@gmail.com",
                    "password": "$2a$10$4M2fx9opyKj/mP4kWA.oA.ezZGbbRrSf3mlbTRD7jn7JBWGeSoxjS",
                    "createdAt": "2019-11-06T02:26:40.207Z",
                    "updatedAt": "2019-11-06T02:26:40.207Z"
                  },
                  "createdAt": "2019-11-08T11:47:46.479Z",
                  "updatedAt": "2019-11-08T11:47:46.479Z"
                }
              ]
            }
        }
        
## Private Articles [/articles]
### Get Public article [GET]


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
           {
              "data": [
                {
                  "featured_image": "https://storage.googleapis.com/mini-temp-bucket/1573213632010fabian-grohs-RrFvYtCwO8E-unsplash.jpg",
                  "tags": [],
                  "_id": "5dc555cea243e012b20caa79",
                  "title": "javascript for baby",
                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                  "author": {
                    "_id": "5dc22f605be4d50f0b3d9a53",
                    "name": "Arnold Therigan",
                    "email": "yonathantherigan12345@gmail.com",
                    "password": "$2a$10$4M2fx9opyKj/mP4kWA.oA.ezZGbbRrSf3mlbTRD7jn7JBWGeSoxjS",
                    "createdAt": "2019-11-06T02:26:40.207Z",
                    "updatedAt": "2019-11-06T02:26:40.207Z"
                  },
                  "createdAt": "2019-11-08T11:47:26.105Z",
                  "updatedAt": "2019-11-08T11:47:26.105Z"
                },
                {
                  "featured_image": "https://storage.googleapis.com/mini-temp-bucket/1573213662610goran-ivos-idmvPhF8t4E-unsplash.jpg",
                  "tags": [],
                  "_id": "5dc555e2a243e012b20caa7a",
                  "title": "code is fun",
                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                  "author": {
                    "_id": "5dc22f605be4d50f0b3d9a53",
                    "name": "Arnold Therigan",
                    "email": "yonathantherigan12345@gmail.com",
                    "password": "$2a$10$4M2fx9opyKj/mP4kWA.oA.ezZGbbRrSf3mlbTRD7jn7JBWGeSoxjS",
                    "createdAt": "2019-11-06T02:26:40.207Z",
                    "updatedAt": "2019-11-06T02:26:40.207Z"
                  },
                  "createdAt": "2019-11-08T11:47:46.479Z",
                  "updatedAt": "2019-11-08T11:47:46.479Z"
                },
                {
                  "featured_image": "https://storage.cloud.google.com/mini-temp-bucket/article.jpg",
                  "tags": [],
                  "_id": "5dc592b80a421c1e343659c5",
                  "title": "sdfas",
                  "content": "<p>ffsdfasfdsfs</p>",
                  "author": {
                    "_id": "5dc22f605be4d50f0b3d9a53",
                    "name": "Arnold Therigan",
                    "email": "yonathantherigan12345@gmail.com",
                    "password": "$2a$10$4M2fx9opyKj/mP4kWA.oA.ezZGbbRrSf3mlbTRD7jn7JBWGeSoxjS",
                    "createdAt": "2019-11-06T02:26:40.207Z",
                    "updatedAt": "2019-11-06T02:26:40.207Z"
                  },
                  "createdAt": "2019-11-08T16:07:20.747Z",
                  "updatedAt": "2019-11-08T16:07:20.747Z"
                }
              ]
            }
        }
        
## Private Articles Detail [/articles{id}]
### Get Private article detail [GET]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
           {
              "data": [
                {
                  "featured_image": "https://storage.cloud.google.com/mini-temp-bucket/article.jpg",
                  "tags": [],
                  "_id": "5dc592b80a421c1e343659c5",
                  "title": "sdfas",
                  "content": "<p>ffsdfasfdsfs</p>",
                  "author": {
                    "_id": "5dc22f605be4d50f0b3d9a53",
                    "name": "Arnold Therigan",
                    "email": "yonathantherigan12345@gmail.com",
                    "password": "$2a$10$4M2fx9opyKj/mP4kWA.oA.ezZGbbRrSf3mlbTRD7jn7JBWGeSoxjS",
                    "createdAt": "2019-11-06T02:26:40.207Z",
                    "updatedAt": "2019-11-06T02:26:40.207Z"
                  },
                  "createdAt": "2019-11-08T16:07:20.747Z",
                  "updatedAt": "2019-11-08T16:07:20.747Z"
                }
              ]
            }
        }
        
### Delete Private article detail [DELETE]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
           message: "delete success"
        }
        
+ Response 400 (application/json)

        {
          "message": "not authorized"
        }