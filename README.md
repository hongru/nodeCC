the version using UglifyJS [do not need `jar` ] -- https://github.com/hongru/Node-CC

NodeCC
======

### Node Compo and Compress tool

js | css files Compo and Merge tool used nodejs

### Features

- used YUI Compressor, both js and css file-compressing are supported
- based on nodejs, simple code
- supported files compo


### Usage

**config.json**
need a file named "config.json" to configure compressing and merging rules.

"config.json" look like this:

<pre>
{
    "css-test": {
        "source": "test/css/",
        "target": "test/public/css/"
    },
    "normal-file-compress": {
        "source": "test/test.js",
        "target": "test/test.min.js"
    },
    "normal-dir-compress": {
        "source": "test/js/",
        "target": "test/public/js/"
    },
    "compress-and-merge": {
        "source": [
            "test/js/a.js",
            "test/js/b.js"
        ],
        "target": "test/public/js/ab.js"
    }
}
</pre>

the files appointed by "source" will be compressed as new files to the path "target".

dir is also supported.

**node**

<pre>
node nodecc.js
</pre>

Ofcourse, the JAVA sdk shoud be installed in advance.

#### License
Released under LIT license
