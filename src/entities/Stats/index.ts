import { getError, getIsLoading, getStats } from './model/selectors/selectors'
import { fetchStats } from './model/service/fetchStats'
import { statsActions, statsReducer } from './model/slice/statsSlice'
import { StatsSchema } from './model/types/types'

export {
	type StatsSchema,
	fetchStats,
	statsReducer,
	statsActions,
	getStats,
	getIsLoading,
	getError
}