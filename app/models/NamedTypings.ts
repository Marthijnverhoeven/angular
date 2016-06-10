/// <reference path="../ts/_all.ts" />

namespace Application.Model
{
	export type SuccessCallback<T> = (data: T) => void;
	export type ErrorCallback<T> = (error: Error, data: T) => void;
}