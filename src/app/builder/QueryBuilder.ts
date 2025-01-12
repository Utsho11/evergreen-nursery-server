/* eslint-disable prefer-const */
import { FilterQuery, Query } from "mongoose";
import { TPlant } from "../modules/Plants/plant.interface";

export class PlantQueryBuilder {
  public query: Record<string, unknown>; // Payload
  public modelQuery: Query<TPlant[], TPlant>;

  constructor(
    modelQuery: Query<TPlant[], TPlant>,
    query: Record<string, unknown>
  ) {
    this.query = query;
    this.modelQuery = modelQuery;
  }

  search(searchableFields: string[]) {
    let searchTerm = "";

    if (this.query?.searchTerm) {
      searchTerm = this.query.searchTerm as string;
    }

    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: new RegExp(searchTerm, "i"),
          }) as FilterQuery<TPlant>
      ),
    });
    return this;
  }

  paginate() {
    let limit: number = Number(this.query?.limit || 10);
    let skip: number = 0;

    if (this.query?.page) {
      const page: number = Number(this.query?.page || 1);
      skip = (page - 1) * limit;
    }

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  sort() {
    let sortBy = "-createdAt"; // Default sorting by `createdAt` in descending order

    if (this.query?.sortBy) {
      const sortField = this.query.sortBy as string;

      // Handle high to low and low to high for price
      if (sortField === "price_asc") {
        sortBy = "price"; // Low to high
      } else if (sortField === "price_desc") {
        sortBy = "-price"; // High to low
      }
    }

    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  fields() {
    let fields = "";

    if (this.query?.fields) {
      fields = (this.query.fields as string).split(",").join(" ");
    }

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"];

    excludeFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<TPlant>);

    return this;
  }
}
