var spawn = require('child_process').spawn;

module.exports = function(repo, targetPath, opts, cb) {

    if (typeof opts === 'function') {
        cb = opts;
        opts = null;
    }

    opts = opts || {};

    var git = opts.git || 'git';
    var args = ['clone'];

    if (opts.shallow) {
        args.push('--depth');
        args.push('1');
    }

    args.push('--');
    args.push(repo);
    args.push(targetPath);

    var process = spawn(git, args);
    process.on('close', function(status) {
        if (status == 0) {
            if (opts.checkout) {
                _checkout();
            } else {
                cb && cb();    
            }
        } else {
            cb && cb(new Error("'git clone' failed with status " + status));
        }
    });

    function _checkout() {
        var args = ['checkout', opts.checkout];
        var process = spawn(git, args, { cwd: targetPath });
        process.on('close', function(status) {
            if (status == 0) {
                cb && cb();
            } else {
                cb && cb(new Error("'git checkout' failed with status " + status));
            }
        });
    }

}
