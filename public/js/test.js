AWS.config.update({
    accessKeyId: 'AKIAISOLVVUUB3XINJAQ',
    secretAccessKey: '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'
});
AWS.config.region = 'us-east-1';

var bucket = new AWS.S3({
    params: {
        Bucket: 'rk-kickoff'
    }
});
theimg = [];
bucket.listObjects(function (err, data) {
    if (err) {
        document.getElementById('status').innerHTML =
            'Could not load objects from S3';
        console.log(err);
    } else {
        for (var i = 0; i < data.Contents.length; i++) {
            theimg.push(data.Contents[i].Key);
            //console.log(data.Contents[i].Key);

        }
    }
});

//get width of the container
var width = parseInt($('body').css('width'), 10);
//get height of the container
var height = $('body').css('height');
//get negative values of div heigth to start div off the screen

function animation() {

    var randomTime = (Math.floor(Math.random() * 30000) + 15000);
    var outterRandomTime = randomTime + 500;

    setInterval(function startAnimation() {
        var make = function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

        var a = make();
        var b = make();

        var themake = '#' + a;
        var themakeimg = '#' + b;

        $("body").append("<div id=" + a + "><img id=" + b + "></div>");
        var imgheight;
        $(themake).css({
            display: 'none'
        });
        //grab random image from image array
        var randomImg = Math.floor(Math.random() * theimg.length);
        var randomSize = Math.floor((Math.random() * 350) + 200);

        var imgurl = 'https://s3.amazonaws.com/rk-kickoff/' + theimg[randomImg];

        //set img to image tag
        $(themakeimg).attr("src", imgurl);
        //Randomize the size of the image
        $(themakeimg).attr("width", randomSize + 'px');

        //wait until image load to display image
        $(themakeimg).on('load', function () {
            $(themake).css({
                display: 'block'
            });

            var img = $(themake + " > img");
            //set div and image to same dimensions
            $(themake).css({
                width: img.width(),
                height: img.height(),
            });

            imgheight = $(this).height();

            //set bottom to the top of image so it starts off frame
            var daimghieght = -(imgheight) - (imgheight / 2);
            //Randomize where the image will show on the x axis
            var randomWidth = Math.floor(Math.random() * (width - (randomSize)));
            //Start animation chain
            $(themake).css({
                left: randomWidth + 'px',
                bottom: daimghieght + 'px'
            });
            console.log(randomTime)
            console.log(outterRandomTime)

            $(function () {
                $(themake).animate({
                    left: randomWidth + 'px',
                    bottom: height
                }, randomTime, 0);
                setInterval(function () {
                    $(themakeimg).remove();
                    $(themake).remove();
                }, randomTime, 'linear');
            });
        });
    }, outterRandomTime);
    //interval to keep loop going
}

animation();
animation();
animation();
animation();
animation();
animation();
animation();
animation();
animation();
animation();
animation();
animation();
animation();
