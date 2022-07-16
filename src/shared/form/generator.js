import * as Mustache from 'mustache';

export async function generate(view) {

    return fetch('angular-form.mustache')
        .then((response) => response.text())
        .then((template) => {
            var rendered = Mustache.default.render(template, view);
            return rendered;
        });

}
