// Header Burger
const headerBurger = document.querySelector('.header__burger')
const headerBurgerLink = document.querySelectorAll('.header__wrapper-burger a')
if (headerBurger) {
    headerBurger.addEventListener('click', () => {
        document.body.classList.toggle('burger')
    });
    headerBurgerLink.forEach((el) => {
        el.addEventListener('click', () => {
            document.body.classList.toggle('burger')
        })
    });
}

// Best Sellers Slider
const ourProductsSlider = document.querySelector('.our-products__slider .swiper')
if (ourProductsSlider) {
    const swiper = new Swiper(ourProductsSlider, {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        grabCursor: true,
        touchEventsTarget: 'container',
        initialSlide: 1,
        pagination: {
            el: '.our-products__pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.our-products__swiper-button-next',
            prevEl: '.our-products__swiper-button-prev',
        },
        breakpoints: {
            1200: {
                spaceBetween: 136,
                slidesPerView: 3
            },
            768: {
                spaceBetween: 50,
                slidesPerView: 3
            },
            500: {
                slidesPerView: 2,

            }
        },
    });
    let countSlidesChanged = 0
    swiper.on('realIndexChange', function (){
        countSlidesChanged = 0
    })
    swiper.on('slideChange', function(){
        countSlidesChanged++
        if (countSlidesChanged === 2) {
            if (swiper.slides.length % 2) {
                ourProductsSlider.classList.toggle('our-products__slider-slide-odd')
            }
        }
    });
}

// FAQ Accordion
const faqQuestionItems = document.querySelectorAll('.faq-questions__item')
if (faqQuestionItems && faqQuestionItems.length > 0) {
    faqQuestionItems.forEach(el => {
        const faqItem = el
        const faqQuestion = el.querySelector('.faq-questions__item-question')
        const faqAnswer = el.querySelector('.faq-questions__item-answer')
        if (faqQuestion && faqAnswer) {
            faqItem.style.maxHeight = faqQuestion.scrollHeight + "px";
            faqQuestion.addEventListener('click', () => {
                faqQuestionItems.forEach(el => {
                    const faqQuest = el.querySelector('.faq-questions__item-question')
                    if (el !== faqItem) {
                        el.classList.remove('faq-questions__item--active')
                        el.style.maxHeight = faqQuest.scrollHeight + "px";
                    }
                })
                faqItem.classList.toggle('faq-questions__item--active')
                if (faqItem.classList.contains('faq-questions__item--active')) {
                    faqAnswer.style.display = 'block'
                    setTimeout(() => {
                        if (faqItem.classList.contains('faq-questions__item--active')) {
                            faqItem.style.maxHeight = faqItem.scrollHeight + "px";
                        }
                    }, 50)
                } else {
                    faqItem.style.maxHeight = faqQuestion.scrollHeight + "px";
                    setTimeout(() => {
                        if (!faqItem.classList.contains('faq-questions__item--active')) {
                            faqAnswer.style.display = 'none'
                        }
                    }, 200)
                }
            })
        }
    })
}

// Info Tabs
const infoTabs = document.querySelector('.info-tabs')
if (infoTabs) {
    const infoTabsTriggers = infoTabs.querySelectorAll('.info-tabs__header-trigger')
    const infoTabsBodies = infoTabs.querySelectorAll('.info-tabs__body')
    const infoTabsButtons = infoTabs.querySelectorAll('.info-tabs__header-btn')
    const infoTabsContent = infoTabs.querySelector('.info-tabs__content')
    if (infoTabsTriggers && infoTabsTriggers.length > 0 && infoTabsBodies && infoTabsBodies.length > 0) {
        let activeTrigger = 1;
        let maxTriggerCount = infoTabsBodies.length
        let maxHeight = 0;
        infoTabsBodies.forEach(el => {
            el.style.display = 'none'
            if (el.scrollHeight > maxHeight) {
                maxHeight = el.scrollHeight
            }
        })
        infoTabsContent.style.minHeight = maxHeight + 'px'
        function resetTabs() {
            infoTabsTriggers.forEach(el => {
                el.classList.remove('info-tabs__header-trigger--active')
            })
            infoTabsBodies.forEach(el => {
                el.classList.remove('info-tabs__body--active')
            })
        }
        function makeTabActive(trigger, triggerBody) {
            trigger.classList.add('info-tabs__header-trigger--active')
            triggerBody.classList.add('info-tabs__body--active')
        }

        infoTabsTriggers.forEach(trigger => {
            const triggerAttrValue = trigger.getAttribute('data-tabs-trigger')
            const triggerAttr = '[data-tabs-body="' + triggerAttrValue + '"]'
            const triggerBody = infoTabs.querySelector(triggerAttr)
            if (triggerBody) {
                trigger.addEventListener('click', () => {
                    resetTabs()
                    activeTrigger = triggerAttrValue
                    makeTabActive(trigger, triggerBody)
                })
            }
        })
        if (infoTabsButtons && infoTabsButtons.length > 0) {
            infoTabsButtons.forEach(el => {
                el.addEventListener('click', () => {
                    if (el.classList.contains('info-tabs__header-btn-prev')) {
                        activeTrigger--
                        resetTabs()
                        if (activeTrigger < 1) {
                            activeTrigger = maxTriggerCount
                        }
                        makeTabActive(infoTabsTriggers[activeTrigger - 1], infoTabsBodies[activeTrigger - 1])
                    } else if (el.classList.contains('info-tabs__header-btn-next')) {
                        activeTrigger++
                        resetTabs()
                        if (activeTrigger > maxTriggerCount) {
                            activeTrigger = 1
                        }
                        makeTabActive(infoTabsTriggers[activeTrigger - 1], infoTabsBodies[activeTrigger - 1])
                    }
                })
            })
        }
    }
}