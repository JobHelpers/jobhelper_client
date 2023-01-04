// todo: set logo, pictures and texts on the right & left sides of page

import firstLogo from '../../assets/first-logo.png'
import spring2022 from '../../assets/spring2022.png'
import autumn2022 from '../../assets/autumn2022.png'
import './styles.scss'

const About = () => {
  return (
    <div className="root">
      <h3 className="headerText">JobHelper</h3>
      <div className="defaultTeamDescription">
        <div className="our-team">
          <h4 className="about-us-text">НАША КОМАНДА ТА ПОЧАТОК ПРОЕКТУ</h4>
          <div className="about-us-text">
            Наша команда складається з кількох ентузіастів - студентів НУЛП та нашого незамінного ментора.
            При старті, у нашій команді було близько 6 людей, не враховуючи ментора, та багато з них покинули
            команду за часи роботи над проектом, через особисті причини.Проект було розпочато осінню 2021р.
            Тоді ми й створили перший логотип, який показано на фото правіше.На час зими 2021-2022
            ми провели презентацію в університеті, проект було одобрено, усі почали над ним працювати.
            Єдине, що тоді було не ясним до кінця - ідея проекту, як саме ми допомагатимемо абітурієнтам та школярам,
            хоча вже на час весни ми вирішили, що хочемо зробити певний сервіс, який буде показувати факультети та університети в
            залежності від предметів, які здавав на ЗНО абітурієнт.
          </div>
        </div>
        <img src={firstLogo} className="imgDefault" alt={'team first logo'} title={"team first logo"}/>
      </div>
      <div className="defaultTeamDescription">
        <img src={spring2022} className="imgDefault" alt={'team spring 2022 mvp'} title={"team spring 2022 mvp"}/>
        <div className="our-team">
          <h4 className="about-us-text">MVP SPRING 2022</h4>
          <div className="about-us-text">
            На час весни 2022р. ми зробили готовий сервіс, який і планували.Кожен учасник був або бек-енд, або фронт-енд
            розробником.На бек-енді ми працювали з базою даних та віддавали потрібні дані по API.А на фронт-енді обробляли їх
            та виводили користувачу.Даний сервіс допоможе вам з вибором потрібного факультету
            та вищого навчального закладу.Цей сервіс є доступний по вкладці "Пошук за предметами" на нашому сайті
          </div>
        </div>
      </div>
      <div className="defaultTeamDescription">
        <div className="our-team">
          <h4 className="about-us-text">MVP Autumn 2022</h4>
          <div className="about-us-text">
            На час осені 2022р. ми реалізували ідею пошуку за вказаними балами ЗНО,
            це перший в Україні пошук за балами ЗНО загалом, усі обчислення проводяться під капотом сайту,
            здебільшого на фронт частині проекту.
            Користувачу потрібно обрати предмети, ввести бали без коефіцієнтів, їх підрахує вже сам сервіс,
            заповнити ще кілька потрібних форм та його шанси на проходження будуть перед ним.
            Мінімальні бали на контракт та бюджет ми беремо з статистики за минулі роки й так визначаємо
            шанси на проходження в той чи інший ВНЗ на той чи інший факультет.
            Цей сервіс є доступний по вкладці "Пошук за балами" на нашому сайті
          </div>
        </div>
        <img src={autumn2022} className="imgDefault" alt={'team spring 2022 mvp'} title={"team spring 2022 mvp"}/>
      </div>
    </div>
  )
}

export default About;
