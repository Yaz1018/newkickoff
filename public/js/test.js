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

        }
    }
});



function animation() {
    //get width of the container
    var width = parseInt($('body').css('width'), 10);
    //get height of the container
    var height = $('body').css('height');

    var randomTime = (Math.floor(Math.random() * 30000) + 15000);
    var outterRandomTime = randomTime + 500;

    (function startAnimation() {

        var themake = $("<div/>");
        var themakeimg = $("<img/>");

        $("body").append($(themake).append(themakeimg));
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

            $(themake).css({
                width: themakeimg.width(),
                height: themakeimg.height(),
            });

            imgheight = $(this).height();

            //set bottom to the top of image so it starts off frame
            var daimghieght = -(imgheight);
            //Randomize where the image will show on the x axis
            var randomWidth = Math.floor(Math.random() * (width - (randomSize)));
            //Start animation chain
            $(themake).css({
                left: randomWidth + 'px',
                bottom: daimghieght + 'px'
            });

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
    })();
    //interval to keep loop going
}

setInterval(animation, 3000);
