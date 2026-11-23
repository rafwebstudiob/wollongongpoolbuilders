(function(){
  var f=document.getElementById('quote-form'); if(!f) return;
  var next=document.getElementById('to-step-2'), back=document.getElementById('back-1');
  var sub=document.getElementById('suburb'), other=f.querySelector('.other-wrap'), otherIn=document.getElementById('suburb_other');
  var ptype=document.getElementById('proj_type'), err=document.getElementById('step1-error');
  var FN=f.getAttribute('data-form')||'quote';
  f.classList.add('is-step-1');
  function syncOther(){ var on=sub.value==='Other'; other.classList.toggle('show',on); otherIn.required=on; }
  sub.addEventListener('change',syncOther); syncOther();
  function step1ok(){
    var ok=true;
    [sub,ptype].concat(otherIn.required?[otherIn]:[]).forEach(function(el){
      var bad=!el.value.trim(); el.setAttribute('aria-invalid',bad?'true':'false'); if(bad) ok=false;
    });
    err.hidden=ok; return ok;
  }
  next.addEventListener('click',function(){
    if(!step1ok()){ (sub.value?(otherIn.required&&!otherIn.value?otherIn:ptype):sub).focus(); return; }
    f.classList.remove('is-step-1'); f.classList.add('is-step-2');
    document.getElementById('name').focus();
    if(window.gtag) gtag('event','form_start',{form_name:FN});
  });
  back.addEventListener('click',function(){ f.classList.remove('is-step-2'); f.classList.add('is-step-1'); sub.focus(); });
  f.addEventListener('submit',function(e){
    if(!step1ok()){ e.preventDefault(); back.click(); return; }
    var n=document.getElementById('name'), p=document.getElementById('phone'), em=document.getElementById('email'), bad=null;
    [n,p,em].forEach(function(el){ var b=!el.value.trim(); el.setAttribute('aria-invalid',b?'true':'false'); if(b&&!bad) bad=el; });
    if(bad){ e.preventDefault(); bad.focus(); return; }
    try{ sessionStorage.setItem('rws_lead_token', String(Date.now())); }catch(_){}
    if(window.gtag) gtag('event','quote_submit',{form_name:FN,page_path:location.pathname,transport_type:'beacon'});
  });
})();
