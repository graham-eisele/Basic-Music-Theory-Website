from django.shortcuts import render, HttpResponse


# Create your views here
def home(request):
    context = {
        'title': 'Home',
    }

    return render(request, "main/home.html", context)


def worksheets(request):
    context = {
        'title': 'Worksheets',
    }

    return render(request, "main/worksheets.html", context)


def about(request):
    context = {
        'title': 'About',
    }

    return render(request, "main/about.html", context)


def worksheet(request, pk):
    try:
        worksheet_number = pk
    except:
        print("Error")
        return HttpResponse("Book not found", status=404)

    context = {
        'title': 'Worksheet ' + str(worksheet_number),
    }

    return render(request, "main/worksheets/worksheet-" + str(pk) + ".html", context)
