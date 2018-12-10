import Swiper from 'swiper/dist/js/swiper'


console.log(1)
const foo = async x => {
    await x
}

foo(1)

const mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    loop: true
});