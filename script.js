feed = new Instafeed({
  
        
        accessToken: '141970.467ede5.edbc9c37472d41b790e1db8948793f11',
        get: 'user',
        userId: 296102572,
        resolution: 'standard_resolution',
        links: 'false',
  template: '<div id="caption">{{caption}} <br>&hearts; {{likes}} on  <a href="{{link}}" class="sky">instagram</a></div><div id="bg"><img src="{{image}}" /></div>',
  mock: true,
  custom: {
    images: [],
    currentImage: 0,
    showImage: function () {
      var result, image;
      image = this.options.custom.images[this.options.custom.currentImage];
      result = this._makeTemplate(this.options.template, {
        model: image,
        id: image.id,
        link: image.link,
        image: image.images[this.options.resolution].url,
        caption: this._getObjectProperty(image, 'caption.text'),
        likes: image.likes.count,
        comments: image.comments.count,
        location: this._getObjectProperty(image, 'location.name')
      });
      $("#instafeed").html(result);
    }
  },
  success: function (data) {
    this.options.custom.images = data.data; 
    this.options.custom.showImage.call(this);
  }
});
feed.run();

$(".next").click(function () {
  var length, current;
  current = feed.options.custom.currentImage;
  length = feed.options.custom.images.length;
  if (current < length - 1) {
    feed.options.custom.currentImage++;
    feed.options.custom.showImage.call(feed);
  }
});

$(".prev").click(function () {
  var length, current;
  current = feed.options.custom.currentImage;
  length = feed.options.custom.images.length;
  if (current > 0) {
    feed.options.custom.currentImage--
    feed.options.custom.showImage.call(feed);
  }
});