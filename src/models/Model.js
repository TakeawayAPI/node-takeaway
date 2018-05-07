export const Model = (Target) => {
    return new Proxy(Target, {
        construct(Target, args) {
            const model = new Target(...args);

            return new Proxy(model, {
                get(target, name, receiver) {
                    if (Target.relationships && Target.relationships.includes(name)) {
                        return target[name];
                    }

                    if (target.data && target.data[name]) {
                        return target.data[name];
                    }
                    return Reflect.get(target, name, receiver);
                }
            });
        }
    });
};

export class BaseModel {
    constructor(takeaway, data) {
        this.takeaway = takeaway;
        this.data = data;
    }
};
