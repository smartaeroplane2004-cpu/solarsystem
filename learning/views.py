from django.shortcuts import redirect, render


def home(request):
	subjects = [
		{
			'number': '01',
			'name': 'Science',
			'description': 'Explore the world, from atoms to galaxies.',
			'available': True,
		},
		{
			'number': '02',
			'name': 'Math',
			'description': 'A new subject is on its way.',
			'available': False,
		},
		{
			'number': '03',
			'name': 'English',
			'description': 'A new subject is on its way.',
			'available': False,
		},
	]
	return render(request, 'learning/home.html', {'subjects': subjects})


def science(request):
	return render(request, 'learning/science.html')

def solar_system(request):
    return redirect('/static/solar-system.html')