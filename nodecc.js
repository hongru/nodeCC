/**
 * js | css files Compo and Merge tool used nodejs
 * @author AlloyTeam.Horizon
 */
 
var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    child_process = require('child_process'),
    nodecc = {};
    
nodecc.configFile = './config.json';
nodecc.googleCompilerPath = './tools/compiler.jar';
nodecc.yuiCompressorPath = './tools/yuicompressor-2.4.6.jar';

;(function ($) {
    var exec = child_process.exec,
        spawn = child_process.spawn,
        dashed = '------------------------\n';
        
    // mkdir -p
    function mkdirpSync (pathes, mode) {
        mode = mode || 0777;
        var dirs = pathes.trim().split('/');
        if (dirs[0] == '.') {
            // ./aaa
            dirs.shift();
        }
        if (dirs[0] == '..') {
            // ../aaa
            dirs.splice(0, 2, dirs[0] + '/' + dirs[1]);
        }
        
        dirs.length && mkdir(dirs.shift());
        // mkdir
        function mkdir (d) {
            if (!path.existsSync(d)) {
                fs.mkdirSync(d, mode);
            }
            
            dirs.length && mkdir(d + '/' + dirs.shift());
        }
    }
    
    function compressFile (from, to) {
        to = to || from;
        // check path
        var dirpath = to.substring(0, to.lastIndexOf('/'));
        !path.existsSync(dirpath) && mkdirpSync(dirpath);
        
        // java -jar yuicompressor-x.y.z.jar myfile.js -o myfile-min.js --charset utf-8
        util.print(from + ' Compressed Begin!\n');
        var runJar = spawn('java', ['-jar', $.yuiCompressorPath, from, '-o', to, '--charset', 'utf-8']);

        runJar.stdout.on('data', function (data) {
            console.log('stdout: \n' + data + '\n');
        });
        runJar.stderr.on('data', function (data) {
            console.log('stderr: \n' + data + '\n');
        });
        runJar.on('exit', function (code) {
            util.print(dashed);
            util.print(from + ' Compressed Finished! ==> ' + to + '\n');
            util.print('YUI Compressor exit with code: ' + code + '\n');
        });

    }
    // get 'source' and 'target' path;
    function getPath (k) {
        var obj = $.configContent[k],
            sPath = obj.source,
            tPath = obj.target;

        if (typeof sPath == 'string') {
            // normal compress
            sPath = sPath.trim();
            if (sPath[sPath.length-1] === '/') {
                // dir
                var files = fs.readdirSync(sPath);
                files.forEach(function (file) {
                    compressFile(sPath + file, tPath + file);
                });
            } else {
                // file
                compressFile(sPath, tPath);
            }
        } else if (typeof sPath == 'object' && sPath.forEach) {
            // merge and compress
            util.print(k + 'merging begin! \n');
            var fd = fs.openSync(tPath, 'a', 0666);
            sPath.forEach(function (p) {
                fs.writeSync(fd, '\n' + fs.readFileSync(p).toString(), null, 'utf8');
            });
            fs.closeSync(fd);
            util.print(k + 'merged finish!\n');
            // compress
            compressFile(tPath);
        }
    }

    function readConfig () {
        if (!path.existsSync($.configFile)) {
            throw 'config.json missed!'
        }
        
        var content = fs.readFileSync($.configFile).toString();
        try {
            content = JSON.parse(content);
        } catch (e) {
            console.log(e.message);
        }
        
        $.configContent = content;
        Object.keys(content).forEach(function (key) {
            getPath(key);
        });
    }
    
    $.init = function () {
        readConfig();
    };
    
})(nodecc);

// start
nodecc.init();