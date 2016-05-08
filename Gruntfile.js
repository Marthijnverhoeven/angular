module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            all: {
                // This copies all the html and css into the dist/ folder
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css', '**/*.js'],
                dest: 'dist/'
            }
        },
        watch: {
            ts: {
				files: "app/**/*.ts",
				tasks: "ts"
			},
			js: {
				files: "app/**/*.js",
				tasks: "copy"
			},
			html: {
				files: 'app/**/*.html',
				tasks: 'copy'
			},
			css: {
				files: 'app/**/*.css',
				tasks: 'copy'
			}
        },
        'http-server': {
            dev: {
                root: './dist',
                port: 3000,
                openBrowser: true,
                runInBackground: true
            }
        },
		ts: {
			default : {
				// src: ["**/*.ts", "!node_modules/**/*.ts"],
				files: [{ src: ['app/ts/app.ts'], dest: 'dist/js/app.js' }],
				// watch: 'app/**/*'
			}
		}
    });

    // Load the npm installed tasks
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-http-server');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['copy', 'ts', 'http-server', 'watch']);
};