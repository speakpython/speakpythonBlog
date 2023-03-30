// adding classes to images
(function($) {

  var SelectionSharer = function(options) {
  
    var self = this;
  
    options = options || {};
    if(typeof options == 'string')
        options = { elements: options };
  
    this.sel = null;
    this.textSelection='';
    this.htmlSelection='';
  
    this.appId = $('meta[property="fb:app_id"]').attr("content") || $('meta[property="fb:app_id"]').attr("value");
    this.url2share = $('meta[property="og:url"]').attr("content") || $('meta[property="og:url"]').attr("value") || window.location.href;
  
    this.getSelectionText = function(sel) {
        var html = "", text = "";
        var sel = sel || window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            text = container.textContent;
            html = container.innerHTML
        }
        self.textSelection = text;
        self.htmlSelection = html || text;
        return text;
    };
  
    this.selectionDirection = function(selection) {
      var sel = selection || window.getSelection();
      var range = document.createRange();
      if(!sel.anchorNode) return 0;
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);
      var direction = (range.collapsed) ? "backward" : "forward";
      range.detach();
      return direction;
    };
  
    
  
    this.pushSiblings = function(el) {
      while(el=el.nextElementSibling) { el.classList.add('selectionSharer'); el.classList.add('moveDown'); }
    };

    this.show = function(e) {
      setTimeout(function() {
        var sel = window.getSelection();
        var selection = self.getSelectionText(sel);
        if(!sel.isCollapsed && selection && selection.length>10 && selection.match(/ /)) {
          var range = sel.getRangeAt(0);
          var topOffset = range.getBoundingClientRect().top - 5;
          var top = topOffset + window.scrollY - self.$popover.height();
          var left = 0;
          if(e) {
            left = e.pageX;
          }
          else {
            var obj = sel.anchorNode.parentNode;
            left += obj.offsetWidth / 2;
            do {
              left += obj.offsetLeft;
            }
            while(obj = obj.offsetParent);
          }
          switch(self.selectionDirection(sel)) {
            case 'forward':
              left -= self.$popover.width();
              break;
            case 'backward':
              left += self.$popover.width();
              break;
            default:
              return;
          }
          self.$popover.removeClass("anim").css("top", top+10).css("left", left).show();
          setTimeout(function() {
            self.$popover.addClass("anim").css("top", top);
          }, 0);
        }
      }, 10);
    };
  
    this.hide = function(e) {
      self.$popover.hide();
    };

    this.smart_truncate = function(str, n){
        if (!str || !str.length) return str;
        var toLong = str.length>n,
            s_ = toLong ? str.substr(0,n-1) : str;
        s_ = toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
        return  toLong ? s_ +'...' : s_;
    };
  
    this.getRelatedTwitterAccounts = function() {
      var usernames = [];
  
      var creator = $('meta[name="twitter:creator"]').attr("content") || $('meta[name="twitter:creator"]').attr("value");
      if(creator) usernames.push(creator);
  
  
      // We scrape the page to find a link to http(s)://twitter.com/username
      var anchors = document.getElementsByTagName('a');
      for(var i=0, len=anchors.length;i<len;i++) {
        if(anchors[i].attributes.href && typeof anchors[i].attributes.href.value == 'string') {
          var matches = anchors[i].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i)
          if(matches && matches.length > 1 && ['widgets','intent'].indexOf(matches[1])==-1)
            usernames.push(matches[1]);
        }
      }
  
      if(usernames.length > 0)
        return usernames.join(',');
      else
        return '';
    };
  
    this.shareTwitter = function(e) {
      e.preventDefault();
  
      var text = "“"+self.smart_truncate(self.textSelection.trim(), 114)+"”";
      var url = 'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)+'&related='+self.relatedTwitterAccounts+'&url='+encodeURIComponent(window.location.href);
  
      // We only show the via @twitter:site if we have enough room
      if(self.viaTwitterAccount && text.length < (120-6-self.viaTwitterAccount.length))
        url += '&via='+self.viaTwitterAccount;
  
      var w = 640, h=440;
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2)-100;
      window.open(url, "share_twitter", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
      self.hide();
      return false;
    };
  
    this.copyClipboard = function(e) {
      e.preventDefault();
      var text = self.htmlSelection.replace(/<p[^>]*>/ig,'\n').replace(/<\/p>|  /ig,'').trim();
      navigator.clipboard.writeText(text.replace(/<[^>]*>/g, ''));
      self.hide();
      window.getSelection().empty();
      return true;
    };
  
    this.shareEmail = function(e) {
      var text = self.htmlSelection.replace(/<p[^>]*>/ig,'\n').replace(/<\/p>|  /ig,'').trim();
      var email = {};
      email.subject = encodeURIComponent("Quote from "+document.title);
      email.body = encodeURIComponent("“"+text+"”")+"%0D%0A%0D%0AFrom: "+document.title+"%0D%0A"+window.location.href;
      $(this).attr("href","mailto:?subject="+email.subject+"&body="+email.body);
      self.hide();
      return true;
    };
  
    this.render = function() {
      var popoverHTML =  '<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">'
                       + '  <div id="selectionSharerPopover-inner">'
                       + '    <ul>'
                       + '      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>'
                       + '      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>'
                       + '      <li><a class="action clipboard" href="" title="Copy this selection to clipboard">Copy</a></li>'
                       + '      </ul>'
                       + '  </div>'
                       + '  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div>'
                       + '</div>';
  
      self.$popover = $(popoverHTML);
      self.$popover.find('a.tweet').click(self.shareTwitter);
      self.$popover.find('a.clipboard').click(self.copyClipboard);
      self.$popover.find('a.email').click(self.shareEmail);
  
      $('body').append(self.$popover);
  
      if (self.appId && self.url2share){
        $(".selectionSharer a.clipboard").css('display','inline-block');
      }
    };
  
    this.setElements = function(elements) {
      if(typeof elements == 'string') elements = $(elements);
      self.$elements = elements instanceof $ ? elements : $(elements);
      self.$elements.mouseup(self.show).mousedown(self.hide).addClass("selectionShareable");
  
      self.$elements.bind('touchstart', function(e) {
        self.isMobile = true;
      });
  
      document.onselectionchange = self.selectionChanged;
    };
  
    this.selectionChanged = function(e) {
      if(!self.isMobile) return;
  
      if(self.lastSelectionChanged) {
        clearTimeout(self.lastSelectionChanged);
      }
      
    };
  
    this.render();
  
    if(options.elements) {
      this.setElements(options.elements);
    }
  
  };
  
  // jQuery plugin
  // Usage: $( "p" ).selectionSharer();
  $.fn.selectionSharer = function() {
    var sharer = new SelectionSharer();
    sharer.setElements(this);
    return this;
  };
  
  // For AMD / requirejs
  // Usage: require(["selection-sharer!"]);
  //     or require(["selection-sharer"], function(selectionSharer) { var sharer = new SelectionSharer('p'); });
  if(typeof define == 'function') {
    define(function() {
      SelectionSharer.load = function (name, req, onLoad, config) {
        var sharer = new SelectionSharer();
        sharer.setElements('p');
        onLoad();
      };
      return SelectionSharer;
    });
  
  }
  else {
    // Registering SelectionSharer as a global
    // Usage: var sharer = new SelectionSharer('p');
    window.SelectionSharer = SelectionSharer;
  }
  
  })(jQuery);
  
  $('p').selectionSharer();
  

const image_list = document.getElementsByTagName("img")
for (var i of image_list){
    i.classList.add("zoomD")
}

// This function will show the image in the lightbox
var zoomImg = function() {
    // Create evil image clone
    var clone = this.cloneNode();
    clone.classList.remove("zoomD");

    // Put evil clone into lightbox
    var lb = document.getElementById("lb-img");
    lb.innerHTML = "";
    lb.appendChild(clone);

    // Show lightbox
    lb = document.getElementById("lb-back");
    lb.classList.add("show");
};

window.addEventListener("load", function() {
    // Attach on click events to all .zoomD images
    var images = document.getElementsByClassName("zoomD");
    if (images.length > 0) {
      for (var img of images) {
        img.addEventListener("click", zoomImg);
      }
    }

    // Click event to hide the lightbox
    document.getElementById("lb-back").addEventListener("click", function() {
      this.classList.remove("show");
    });
});

$(':header[id]').each(function() {
  var anchor = document.createElement('a')
  anchor.href = '#' + this.id
  $(this).wrapInner(anchor)
  this.innerHTML += `<span class='small text-dark internal-bookmark' title="Share link"> <i class="bi bi-bookmark"></i></span>`
});

$('.internal-bookmark').click(function() {
  navigator.clipboard.writeText(this.parentNode.href);
  this.innerHTML = 
  `<span class="small text-dark internal-bookmark" title="Share link" style="
    display: inline-block;
    width: 6rem;
    padding: 0rem 0.2rem;"> 
      <div class="row px-3">
        <div class="col-2 mr-3 p-0">
            <i class="bi bi-clipboard-check"></i>
        </div>
        <div class="col-8" style="
          font-size: 0.655rem;
          font-weight: normal;
          line-height: 0.7rem;
          font-family: Arial;"> Link Copied 
        </div>        
      </div>
  </span>`;
  setTimeout(()=>{
    this.innerHTML = ` <i class="bi bi-bookmark"></i>`;
  }, 3500)
})

function scrollHandler() {
  const progressBar = document.querySelector('.progress-bar');
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  var scrolled = (winScroll / height) * 100
  progressBar.parentElement.style.display = "none";
  if ((winScroll > document.documentElement.clientHeight)){
    progressBar.parentElement.style.display = "flex";
  }
  progressBar.style.width = `${scrolled}%`;
    
}
window.addEventListener('scroll', scrollHandler);