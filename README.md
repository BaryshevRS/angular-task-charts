# Задания на вывод графиков в Angular

*Решение*: https://angular-task-charts.web.app

Нужно создать формы ввода данных с выводом в виде графика. 
Данные должны отображаться сразу после ввода в графике (без перезагрузок страницы) 
Вводимые данные нужно валидировать, допустимые значения от 0 до 1000.

### Поля ввода:

1) Введите расход угля (тонн).
2) Введите расход газа (тыс. м3).

### Вывести в график:

1) Выбросы СО2 от сжигания газа (тонн)
2) Выбросы СО2 от сжигания твердого топлива (тонн)
3) Общий сумма выбросов СО2 от сжигания (тонн)

### Расчет:

1) Выбросы СО2 от сжигания газа (тонн) = (Введите расход газа (тыс. м3)) *1.129)*1.59
2) Выбросы СО2 от сжигания твердого топлива (тонн) = (Введите расход угля (тонн)) *0.768)*2.76

### Вывод:

Для UI ввода и страницы использовать Angular Material UI (https://material.angular.io/). 
Визуальное оформление – любое на выбор.

1) Первый график:

Для вывода графика использовать библиотеку Apache ECharts (https://echarts.apache.org/examples/en/index.html) 
тип ```#chart-type-scatter```, оформление на выбор.

2) Второй график:

Для вывода графика использовать библиотеку APEXCHARTS (https://apexcharts.com/angular-chart-demos/area-charts/spline/) 
тип ```#Area Charts > Spline```, оформление на выбор.
