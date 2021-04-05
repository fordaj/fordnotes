const section = 'section';
const subTitle = 'section > h2';
const subSection = 'section > h3';

//slide in animation on page load and hide h3 & iframes
$(document).ready(function () {
    function slideIn(element) {
        gsap.fromTo(
            $(element),
            1,
            { opacity: 0, x: '100vw' },
            { stagger: 0.1, ease: 'sine.out', opacity: 1, x: 0 }
        );
    }
    slideIn(section);
    slideIn('h1');
    $('iframe').css({ position: 'absolute', opacity: '0' });
    $(subSection).css({ position: 'absolute', opacity: '0' });
    $(section).bind('click', openOrCloseSection);
});

//open or close sections on click
function openOrCloseSection() {
    if (event.target.nodeName == 'H3') {
        //if h3 element is clicked, don't close section
    } else if ($(this).children('h3').css('position') == 'relative') {
        //close section
        setTimeout(
            $(this)
                .children('h3, iframe')
                .css({ opacity: '0', position: 'absolute' }),
            2
        );
    } else {
        //open h3
        $(this).children('h3').css({ position: 'relative', opacity: '1' });
        let tl = gsap.timeline();
        tl.fromTo($(this).children('h3'), 0.2, { x: 200 }, { x: 0 });
        if ($(this).siblings().children().css('position') === 'relative') {
            //close any other open sections
            $(this)
                .siblings()
                .children('h3, iframe')
                .css({ position: 'absolute', opacity: '0' });
        }
    }
}

//set iframe src on first click
$(subSection).one('click', function () {
    const iframe = $(event.target).next('iframe');
    iframe.attr('src', iframe.attr('id'));
});

//toggle iframes open and closed on clicking h3
$(subSection).click(function () {
    let targetIframe = $(event.target).next('iframe');

    if (targetIframe.css('position') == 'relative') {
        //close iframe (delayed to avoid element being half open)
        setTimeout(function () {
            targetIframe.css({ position: 'absolute', opacity: '0' });
        }, 50);
    } else {
        //open iframe(delayed to allow header elements to be removed)
        setTimeout(function () {
            targetIframe.css({ position: 'relative', opacity: '1' });
            gsap.fromTo(targetIframe, 0.2, { x: 200 }, { x: 0 });
        }, 75);
    }
});

//set iframe height dynamically
function getDocHeight(doc) {
    doc = doc || document;
    (body = doc.body), (html = doc.documentElement);
    height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    return height;
}

function setIframeHeight(id) {
    //hide h1, h2, and h3 in iframe
    $('iframe').contents().find('h1, h2, h3').remove();
    let iframe = document.getElementById(id);
    const doc = iframe.contentDocument
        ? iframe.contentDocument
        : iframe.contentWindow.document;
    iframe.style.height = getDocHeight(doc) + 20 + 'px';
}
