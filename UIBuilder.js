function UIBuilder(){

  this.render = (markdownString) => {
    return markdownConverter.render(markdownString)
  };

}


if(typeof window._context === 'undefined'){
   window._context = {};
}
window._context["UIBuilder"] =  new UIBuilder();
