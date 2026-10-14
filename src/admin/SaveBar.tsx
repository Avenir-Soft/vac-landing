import { RotateCcw, Save } from 'lucide-react'
import { Button } from './ui'

type Props = {
	title: string
	dirty: boolean
	busy: boolean
	saving: boolean
	onSave: () => void
	onReset: () => void
}

const SaveBar = ({ title, dirty, busy, saving, onSave, onReset }: Props) => (
	<div className='sticky top-[61px] z-20 -mx-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 bg-[#24262b]/95 px-4 py-3 backdrop-blur'>
		<div>
			<h2 className='text-lg font-bold text-white'>{title}</h2>
			<p className={`text-xs ${dirty ? 'text-amber-300' : 'text-slate-400'}`}>
				{dirty ? 'Есть несохранённые изменения' : 'Всё сохранено — сайт показывает эту версию'}
			</p>
		</div>
		<div className='flex gap-2'>
			<Button variant='ghost' onClick={onReset} disabled={!dirty || busy || saving}>
				<RotateCcw size={16} />
				Отменить
			</Button>
			<Button variant='primary' onClick={onSave} disabled={!dirty || busy || saving}>
				<Save size={16} />
				{saving ? 'Сохраняю…' : 'Сохранить на сайте'}
			</Button>
		</div>
	</div>
)

export default SaveBar
