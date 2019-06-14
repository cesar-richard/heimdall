class SalesLocationModel {
  constructor({
    barcode_mode,
    categories,
    enabled,
    events,
    fun_id,
    fundation,
    id,
    name,
    payment_methods,
    sales_keyboards,
    staff_zone,
    warehouse
  } = {}) {
    this._barcode_mode = barcode_mode;
    this._categories = categories;
    this._enabled = enabled;
    this._events = events;
    this._fun_id = fun_id;
    this._fundation = fundation;
    this._id = id;
    this._name = name;
    this._payment_methods = payment_methods;
    this._sales_keyboards = sales_keyboards;
    this._staff_zone = staff_zone;
    this._warehouse = warehouse;
  }

  get warehouse() {
    return this._warehouse;
  }
  set warehouse(value) {
    this._warehouse = value;
  }
  get staff_zone() {
    return this._staff_zone;
  }
  set staff_zone(value) {
    this._staff_zone = value;
  }
  get sales_keyboards() {
    return this._sales_keyboards;
  }
  set sales_keyboards(value) {
    this._sales_keyboards = value;
  }

  get payment_methods() {
    return this._payment_methods;
  }
  set payment_methods(value) {
    this._payment_methods = value;
  }

  get barcode_mode() {
    return this._barcode_mode;
  }

  set barcode_mode(value) {
    this._barcode_mode = value;
  }

  get categories() {
    return this._categories;
  }

  set categories(value) {
    this._categories = value;
  }

  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
  }

  get events() {
    return this._events;
  }
  set events(value) {
    this._events = value;
  }

  get fun_id() {
    return this._fun_id;
  }
  set fun_id(value) {
    this._fun_id = value;
  }

  get fundation() {
    return this._fundation;
  }
  set fundation(value) {
    this._fundation = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}

export default SalesLocationModel;
