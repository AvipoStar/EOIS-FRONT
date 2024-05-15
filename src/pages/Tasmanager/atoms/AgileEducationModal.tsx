import '../styles/AgileEducationModal.css';
interface IAgileEducationModal {
  setShow: any;
}

export const AgileEducationModal = (params: IAgileEducationModal) => {
  return (
    <div className="AgileEducationModal">
      <div
        className="AgileEducationModalBackground"
        onClick={() => params.setShow(false)}
      />
      <div className="AgileEducationModalForm">
        <h2 className="AgileEducationModalFormTitle">
          Что такое{" "}
          <span className="AgileEducationModalFormActiveText">Agile</span>?
        </h2>
        <p className="AgileEducationModalFormText">
          <span className="AgileEducationModalFormActiveText">Agile</span> - это
          способ управления проектами, который помогает командам работать вместе
          и достигать целей. Вместо того, чтобы делать все сразу, проект
          разбивается на небольшие части, называемые спринтами, чтобы процесс
          стал более управляемым и гибким.{" "}
          <span className="AgileEducationModalFormActiveText">Agile</span> также
          поддерживает постоянное взаимодействие с заказчиком, что позволяет
          быстро адаптироваться к изменениям.
        </p>
        <h2 className="AgileEducationModalFormTitle">
          Как использовать{" "}
          <span className="AgileEducationModalFormActiveText">Scrum</span>
          -доску?
        </h2>
        <p className="AgileEducationModalFormText">
          <span className="AgileEducationModalFormActiveText">Scrum</span>-доска
          - это специальная доска, на которой отображаются задачи, которые нужно
          выполнить. Она разделена на разделы, такие как "Что нужно сделать",
          "Сейчас делается" и "Задача выполнена". Каждая задача представлена
          карточкой, которая перемещается по колонкам в зависимости от статуса
          выполнения. Это помогает команде видеть, какие задачи остались, что в
          процессе и что уже выполнено.
        </p>
      </div>
    </div>
  );
};
