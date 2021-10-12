import exceptions.NoImplementationException;
import exceptions.NotAuthorizedException;
import model.Giraffe;
import model.LoginData;
import model.User;
import token.JWTHandler;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//http://localhost:8080/rest/test/names

@Produces(MediaType.APPLICATION_JSON)
@Path("test")
public class Service {
    String strang = "Halløj.. er det mig du kigger efter? Ich kann es in deinen Augen sehen-";
    List<String> names = new ArrayList<>(Arrays.asList("Nikolikolaj", "JoJo", "Anaximander"));
    List<Giraffe> giraffes = new ArrayList<>(Arrays.asList());

    @GET
    public String getTest(){
        return strang;
    }

    @Path("names")
    @GET
    public List<String> getNames(){
        return names;
    }

    @Path("names")
    @POST
    public void addNames(String name){
        names.add(name);
    }

    @GET
    @Path("query")
    public List<Giraffe> queryGiraffes(@QueryParam("name") String name) throws NoImplementationException {
        //No implementaion yet
        throw new NoImplementationException("giraffe-queries not implemented, yet");
    }
}